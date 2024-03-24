import React, { useEffect, useState } from "react";
import { Avatar } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import { Link } from "react-router-dom";

export const transformViews = (value) => {
  return Math.abs(Number(value)) >= 1.0e9
    ? (Math.abs(Number(value)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(value)) >= 1.0e6
    ? (Math.abs(Number(value)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(value)) >= 1.0e3
    ? (Math.abs(Number(value)) / 1.0e3).toFixed(2) + "K"
    : Math.abs(Number(value));
};

const VideoCard = ({ video }) => {
  const { menuOpen } = useSelector((state) => state.ui);

  return (
    <div className={`${menuOpen ? "w-[320px] 2xl:w-[295px]" : "w-full md:w-[340px] lg:w-[460px] xl:w-[390px] 2xl:w-[330px]"}`}>
      <Link to={`/watch/${video._id}`}>
      <img
        src={video?.thumbnails}
        alt="thumbnail"
        className={`md:rounded-lg ${menuOpen ? "w-[320px] 2xl:w-[295px] 2xl:h-[175px] h-[220px] 2xl:[280px] object-cover" : "w-full md:w-[340px] lg:w-[460px] h-[220px] lg:h-[250px] xl:h-[180px] 2xl:[250px] object-cover 2xl:w-[330px]"} cursor-pointer`}
      />
      </Link>
      <div className={`flex gap-2 mt-2 px-2`}>
        <Avatar size={"sm"} src={video?.user?.picture} className="mt-1" />
        <div>
          <h3 className=" font-medium cursor-pointer">
            {video.title.trim().slice(0, 70)}
            {video.title.trim().length > 70 && "..."}
          </h3>
          <p className="text-black/50 dark:text-white/40 font-medium">
            {video.user?.name}
          </p>
          <p className="text-black/50 dark:text-white/40 font-medium flex gap-2 items-center">
            {transformViews(video.view) || 0} {video.view == 0 ? "view" : "views"} •{" "}
            {video?.createdAt ? (
              formatDistanceToNow(video.createdAt)
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="22"
                  height="22"
                  viewBox="0 0 48 48"
                >
                  <circle cx="24" cy="24" r="6" fill="#f44336"></circle>
                  <path
                    fill="#f44336"
                    d="M17.09,16.789L14.321,13.9C11.663,16.448,10,20.027,10,24s1.663,7.552,4.321,10.1l2.769-2.889 C15.19,29.389,14,26.833,14,24C14,21.167,15.19,18.61,17.09,16.789z"
                  ></path>
                  <path
                    fill="#f44336"
                    d="M33.679,13.9l-2.769,2.889C32.81,18.611,34,21.167,34,24c0,2.833-1.19,5.389-3.09,7.211l2.769,2.889 C36.337,31.552,38,27.973,38,24S36.337,16.448,33.679,13.9z"
                  ></path>
                  <g>
                    <path
                      fill="#f44336"
                      d="M11.561,11.021l-2.779-2.9C4.605,12.125,2,17.757,2,24s2.605,11.875,6.782,15.879l2.779-2.9 C8.142,33.701,6,29.1,6,24S8.142,14.299,11.561,11.021z"
                    ></path>
                    <path
                      fill="#f44336"
                      d="M39.218,8.121l-2.779,2.9C39.858,14.299,42,18.9,42,24s-2.142,9.701-5.561,12.979l2.779,2.9 C43.395,35.875,46,30.243,46,24S43.395,12.125,39.218,8.121z"
                    ></path>
                  </g>
                </svg>
                <span>LIVE</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
