import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { toggleMenu } from "@/store/slices/uiSlice";
import {
  setAccessToken,
  setMyChannel,
  setUser,
} from "@/store/slices/userSlice";
import {
  addHomeVideos,
  addSearchItems,
  setNextPageToken,
  setSearchPageToken,
} from "@/store/slices/videoSlice";
import axios from "axios";
import { Menu } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useParams } from "react-router-dom";

const Main = () => {
  const { darkMode, menuOpen } = useSelector((state) => state.ui);

  const { accessToken, myChannel } = useSelector((state) => state.user);

  const { nextPageToken, searchPageToken } = useSelector(
    (state) => state.video
  );
  
  useEffect(() => {
    if (
      darkMode ||
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  const dispatch = useDispatch();

  const menuToggleHandler = () => {
    dispatch(toggleMenu());
  };

  const ref = useRef();

  const { search } = useParams();

  const onScroll = () => {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight;

      if (isNearBottom) {
      }
    }
  };

  useEffect(() => {
    const listInnerElement = ref.current;

    if (listInnerElement) {
      listInnerElement.addEventListener("scroll", onScroll);

      // Clean-up
      return () => {
        listInnerElement.removeEventListener("scroll", onScroll);
      };
    }
  }, [nextPageToken, searchPageToken]);

  return (
    <div
      className={`dark:bg-[#313131] dark:text-white max-h-screen overflow-y-scroll scrollbar-thin scrollbar-h-96 scrollbar-thumb-rounded-lg scrollbar-thumb-[#4b4b4b] scrollbar-track-[#ffffff]`}
      ref={ref}
    >
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex items-center mx-5">
        <div
          className="p-2 hover:text-gray-500 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-[#4D4C4C] rounded-full cursor-pointer"
          onClick={menuToggleHandler}
        >
          <Menu />
        </div>
        <Navbar />
      </div>
      <div className="flex min-h-screen">
        <div className={`${menuOpen ? "mr-2" : "xl:mr-20"}`}>
          <Sidebar navOpen={menuOpen} />
        </div>
        <div className=" dark:bg-[#1a1a1a] w-full overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
