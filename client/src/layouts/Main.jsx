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

  const getUser = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API}/auth/login/success`,
      { withCredentials: true }
    );
    const { accessToken, profile } = response.data.user;
    dispatch(setUser(profile._json));
    dispatch(setAccessToken(accessToken));
  };

  useEffect(() => {
      getUser();
  }, [accessToken]);

  const getMyChannelDetails = async () => {
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&mine=true&key=${
        import.meta.env.VITE_YOUTUBE_API_KEY
      }`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const res = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&maxResults=200&mine=true&key=${
        import.meta.env.VITE_YOUTUBE_API_KEY
      }`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(
      setMyChannel({ ...response.data.items[0], subscription: res.data.items })
    );
  };

  useEffect(() => {
    getMyChannelDetails();
    // getSubscriptionList();
  }, [accessToken]);

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

  const [countryCode, setCountryCode] = useState(null);

  // const getRegion = async () => {
  //   const response = await axios.get(`
  //   https://youtube.googleapis.com/youtube/v3/i18nRegions?key=${
  //     import.meta.env.VITE_YOUTUBE_API_KEY
  //   }`);
  //   const country = response.data.items.map((d) => {
  //     return d.id;
  //   });
  //   const randomCountry = Math.floor(Math.random() * country.length);
  //   setCountryCode(country[randomCountry]);
  // };

  const fetchData = async () => {
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=21&key=${
        import.meta.env.VITE_YOUTUBE_API_KEY
      }`
    );
    dispatch(addHomeVideos(response.data.items));
    dispatch(setNextPageToken(response.data.nextPageToken));
  };

  const getHomeVideos = async () => {
    let prevToken = nextPageToken;
    const res = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=21&key=${
        import.meta.env.VITE_YOUTUBE_API_KEY
      }&pageToken=${prevToken}`
    );
    dispatch(setNextPageToken(res.data.nextPageToken));
    dispatch(addHomeVideos(res.data.items));
  };

  // useEffect(() => {
  //   getRegion();
  // }, []);

  useEffect(() => {
    fetchData();
  }, [countryCode]);

  const { search } = useParams();

  const searchByQuery = async () => {
    let prevToken = searchPageToken;
    // const options = {
    //   method: 'GET',
    //   url: 'https://youtube-v31.p.rapidapi.com/search',
    //   params: {
    //     q: search,
    //     part: 'snippet,id',
    //     regionCode: 'US',
    //     maxResults: '5',
    //     type: 'video',
    //     pageToken: prevToken
    //   },
    //   headers: {
    //     'X-RapidAPI-Key': '2aa9f3290bmsh892e52f642bf32ep1b2933jsn5309c1d34b86',
    //     'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    //   }
    // };
    // const response = await axios.request(options);
    const response = await axios.get(`
    https://youtube.googleapis.com/youtube/v3/search?q=${search}&type=video&key=${
      import.meta.env.VITE_YOUTUBE_API_KEY
    }&pageToken=${prevToken}`);
    console.log(response.data.items);
    dispatch(addSearchItems(response.data.items));
    dispatch(setSearchPageToken(response.data.nextPageToken));
  };

  const onScroll = () => {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight;

      if (isNearBottom) {
        if (nextPageToken) {
          getHomeVideos();
        } else if (searchPageToken) {
          searchByQuery();
        } else {
          console.log("");
        }
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
