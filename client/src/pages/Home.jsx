import VideoCard from "@/components/video/VideoCard";
import { setAccessToken, setUser } from "@/store/slices/userSlice";
import { addHomeVideos, setNextPageToken } from "@/store/slices/videoSlice";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const { menuOpen } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  const { homeVideos, nextPageToken } = useSelector((state) => state.video);

  const { accessToken } = useSelector((state) => state.user);

  useEffect(() => {
    return () => dispatch(setNextPageToken(""));
  }, []);

  const getUser = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API}/auth/login/success`,
      { withCredentials: true }
    );
    const { accessToken, profile } = response.data.user;
    dispatch(setUser(profile._json));
    dispatch(setAccessToken(accessToken));
    localStorage.setItem("token", accessToken);
  };

    useEffect(() => {
        getUser();
    }, []);

  return (
    <div
      className={`md:mx-8 flex flex-wrap gap-5 xl:pt-4 ${
        menuOpen && "ml-8 mr-0"
      }`}
    >
      {homeVideos &&
        homeVideos.length > 0 &&
        homeVideos.map((video, i) => <VideoCard video={video} key={i} />)}
    </div>
  );
};

export default Home;
