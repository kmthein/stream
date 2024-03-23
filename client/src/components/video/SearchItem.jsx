import axios from "axios";
import React, { useEffect, useState } from "react";
import { transformViews } from "./VideoCard";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { Avatar } from "@chakra-ui/react";

const SearchItem = ({ video }) => {
  const [searchVideo, setSearchVideo] = useState({});
  const [channelId, setChannelId] = useState(null);

  const getSearchDetails = async () => {
    // const options = {
    //     method: 'GET',
    //     url: 'https://youtube-v31.p.rapidapi.com/videos',
    //     params: {
    //       part: 'contentDetails,snippet,statistics',
    //       id: video.id.videoId
    //     },
    //     headers: {
    //       'X-RapidAPI-Key': '2aa9f3290bmsh892e52f642bf32ep1b2933jsn5309c1d34b86',
    //       'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    //     }
    //   };
    // const response = await axios.request(options);
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&id=${
        video.id.videoId
      }&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
    );
    setSearchVideo({ ...video, videoDetail: response.data.items[0] });
    setChannelId(response.data.items[0].snippet.channelId);
  };

  useEffect(() => {
    getSearchDetails();
  }, []);

  const { videoDetail, channelDetails } = searchVideo;

  const getChannelDetails = async () => {
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails&part=snippet&part=statistics&id=${channelId}&key=${
        import.meta.env.VITE_YOUTUBE_API_KEY
      }`
    );
    if (response.data.items) {
      setSearchVideo({
        ...searchVideo,
        channelDetails: response?.data?.items[0],
      });
    }
  };

  // const options = {
  //     method: 'GET',
  //     url: 'https://youtube-v31.p.rapidapi.com/channels',
  //     params: {
  //       part: 'snippet,statistics',
  //       id: channelId
  //     },
  //     headers: {
  //       'X-RapidAPI-Key': '2aa9f3290bmsh892e52f642bf32ep1b2933jsn5309c1d34b86',
  //       'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  //     }
  //   };
  //   const response = await axios.request(options);

  useEffect(() => {
    getChannelDetails();
  }, [channelId]);

  return (
    <>
      {videoDetail?.snippet && (
        <div className="md:flex gap-4 my-3">
          <Link to={`/watch/${searchVideo.id.videoId}`}>
            <div className="w-full md:w-[350px]">
            <img src={videoDetail?.snippet?.thumbnails?.high?.url} className='md:rounded-lg h-[230px] xl:h-[190px] w-full object-cover' />
            </div>
          </Link>
          <div className="mx-2 md:mx-0">
            <Link to={`/watch/${searchVideo.id.videoId}`}>
              <span className="font-base text-lg mb-2">
                {videoDetail?.snippet?.title}
              </span>
            </Link>
            <p className="dark:text-white/40 text-sm text-gray-500 mt-2">
              {transformViews(videoDetail?.statistics?.viewCount)} views •{" "}
              <span className="dark:text-white/40 text-sm text-gray-500">
                {videoDetail?.snippet.publishedAt
                  ? formatDistanceToNow(videoDetail?.snippet.publishedAt)
                  : "LIVE"}
              </span>
              <div className="my-4 flex items-center gap-2">
              <Avatar
              name={channelDetails?.snippet?.channelTitle}
              size={"sm"}
              src={channelDetails?.snippet?.thumbnails?.default?.url}
            />
                {/* <img
                  src={channelDetails?.snippet?.thumbnails?.default?.url}
                  alt="channel-logo"
                  className="w-7 rounded-full"
                /> */}
                <span className="dark:text-white/40 text-sm text-gray-500">
                  {videoDetail?.snippet?.channelTitle}
                </span>
              </div>
              <p className="dark:text-white/40 text-sm text-gray-500">
                {videoDetail?.snippet?.description.slice(0, 110)}
                {videoDetail?.snippet?.description.length > 110 && "..."}
              </p>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchItem;
