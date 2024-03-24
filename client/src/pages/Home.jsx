import { getAllVideos } from "@/api/video";
import VideoCard from "@/components/video/VideoCard";
import { setAccessToken, setUser } from "@/store/slices/userSlice";
import { addHomeVideos, setNextPageToken } from "@/store/slices/videoSlice";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const { menuOpen } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  const { homeVideos, nextPageToken } = useSelector((state) => state.video);

  const { accessToken } = useSelector((state) => state.user);

  const { data } = useQuery({
    queryKey: ["videos"],
    queryFn: ({signal}) => getAllVideos({ signal })
  })

  return (
    <div
      className={`md:mx-8 flex flex-wrap gap-5 xl:pt-4 ${
        menuOpen && "ml-8 mr-0"
      }`}
    >
      {data?.videos &&
        data?.videos.length > 0 ?
        data?.videos.map((video, i) => <VideoCard video={video} key={i} />) : (
          <p>Video Not Found.</p>
        )}
    </div>
  );
};

export default Home;
