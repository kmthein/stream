import React, { useEffect, useState } from 'react'
import { transformViews } from './VideoCard'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { formatDistanceToNow, intlFormatDistance } from "date-fns";

const RelatedVideos = ({ video }) => {
    const [related, setRelated] = useState();

    const getRelateDetails = async () => {
        const response = await axios.get(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&id=${video.id.videoId}&key=${
            import.meta.env.VITE_YOUTUBE_API_KEY
          }`
        );
        setRelated(response.data.items[0]);
      };

    useEffect(() => {
        getRelateDetails();
    }, [])

  return (
    <div className=" mb-2 flex gap-3">
        <Link to={`/watch/${video.id.videoId}`}>
        <img src={video?.snippet?.thumbnails?.high?.url} className="w-[170px] h-[100px] rounded-lg object-cover" />
        </Link>
        <div className="w-[200px]">
          <h3 className=" font-medium">{video?.snippet?.title.trim().slice(0, 58)}{video?.snippet?.title.length > 58 && "..." }</h3>
          <p className=" dark:text-white/40 text-[11px] text-gray-500 mt-1">
            {video?.snippet?.channelTitle}
          </p>
          <p className="dark:text-white/40 text-sm text-gray-500">
            {transformViews(related?.statistics.viewCount)}{" "} views • <span className="dark:text-white/40 text-sm text-gray-500">{video?.snippet.publishedAt ? formatDistanceToNow(video?.snippet.publishedAt) : "LIVE"}</span>
          </p>
        </div>
      </div>
  )
}

export default RelatedVideos