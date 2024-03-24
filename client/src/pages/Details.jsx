import { closeMenu, toggleMenu } from "@/store/slices/uiSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { Avatar, Button, Center, Divider } from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { transformViews } from "@/components/video/VideoCard";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { BiDislike, BiLike } from "react-icons/bi";
import RelatedVideos from "@/components/video/RelatedVideos";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  format,
  formatDistanceToNow,
  formatISO,
  formatISO9075,
} from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getSingleVideo } from "@/api/video";

const Details = () => {
  const { menuOpen, darkMode } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu());
  }, []);

  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["video", id],
    queryFn: ({ signal }) => getSingleVideo({ signal, id }),
  });

  const video = data.video;

  const [newVideo, setNewVideo] = useState({});
  const [channelId, setChannelId] = useState(null);

  const [relatedVideo, setRelatedVideo] = useState([]);

  const [accordionOpen, setAccordionOpen] = useState(false);

  const { snippet, statistics, channelDetails } = newVideo;

  const getHeight = () => {
    if (screen.width < 500) {
      return "35vh";
    } else if (screen.width < 1100) {
      return "55vh";
    } else {
      return "75vh";
    }
  };

  const [playerHeight, setPlayerHeight] = useState(getHeight());

  useEffect(() => {
    getHeight();
  }, [screen.width]);

  return (
    <div className="xl:flex">
      <div className="xl:pt-6 px-0 xl:px-8 xl:w-[70%]">
        <ReactPlayer
          url={video.video.url}
          controls={true}
          width={"100%"}
          height={playerHeight}
          className="rounded-full"
        />
        <div className="px-4 xl:px-0">
          <h3 className=" font-semibold text-[21px] my-3">{video?.title}</h3>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Avatar
                size={"md"}
                src={video?.user?.picture}
                className="mt-1"
              />
              <div className="ml-4">
                <p className=" dark:text-white/40 font-medium text-lg">
                  {video?.user?.name}
                </p>
                <p className="text-sm">
                  {transformViews(video?.user?.subscribers) || 0}{" "}
                  subscribers
                </p>
              </div>
              <div>
                <Menu>
                  <MenuButton>
                    {/* <div className="bg-gray-200 ml-6 py-2 px-3 flex gap-2 rounded-full font-medium">
               <Bell /> Subscribed <ChevronDownIcon />
              </div> */}
                    <div className="bg-[#141414] dark:bg-[#313131] text-white ml-6 py-2 px-3 flex gap-2 rounded-full font-medium">
                      Subscribe
                    </div>
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Unsubscribe</MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </div>
            <div className="my-4 xl:my-0">
              <div className="flex">
                <button
                  className={`bg-[#E5E5E5] dark:bg-[#313131] pr-4 pl-2 py-2 flex gap-2 rounded-tl-full rounded-bl-full hover:bg-[#d3d3d3] hover:dark:bg-[#292929]`}
                >
                  <BiLike className="text-2xl text-black dark:text-white" />{" "}
                  8.8K
                </button>
                <div className="border-r border-[#fff]"></div>
                <button className="bg-[#E5E5E5] dark:bg-[#313131] px-4 py-2 flex gap-2 rounded-tr-full rounded-br-full hover:bg-[#d3d3d3] hover:dark:bg-[#292929]">
                  <BiDislike className="text-2xl text-black dark:text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`bg-[#f3f3f3] ${
            !accordionOpen && "hover:bg-[#e2e2e2]"
          } dark:bg-[#272727] dark:hover:bg-[#3b3b3b] p-4 mt-3 rounded-lg mb-8 mx-4 xl:mx-0`}
        >
          <h4 className="font-medium">
          {transformViews(video.view) || 0} {video.view == 0 ? "view" : "views"} •{" "}
            <span className="ml-2">
              {video?.createdAt
                ? format(video?.createdAt, "dd MMMM yyyy")
                : "LIVE"}
            </span>
          </h4>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionContent>
                <span className=" whitespace-pre-wrap">
                  {video?.description}
                </span>
              </AccordionContent>
              {!accordionOpen ? (
                <>
                  {video?.snippet?.description.slice(0, 528)}
                  <AccordionTrigger onClick={() => setAccordionOpen(true)}>
                    ...more
                  </AccordionTrigger>
                </>
              ) : (
                <AccordionTrigger onClick={() => setAccordionOpen(false)}>
                  Show less
                </AccordionTrigger>
              )}
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div>
        <div className=" mx-4 xl:ml-8 mt-6">
          {relatedVideo &&
            relatedVideo.length > 0 &&
            relatedVideo.map((video) => (
              <RelatedVideos video={video} id={id} key={id} />
            ))}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Details;
