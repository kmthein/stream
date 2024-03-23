import React from 'react'
import { NavLink } from 'react-router-dom'
import { ImHome3 } from "react-icons/im";
import { MdOutlineSubscriptions, MdSubscriptions } from "react-icons/md";
import { useSelector } from 'react-redux';
import { BsPersonSquare } from "react-icons/bs";
import { VscHistory } from "react-icons/vsc";
import { BiLike } from "react-icons/bi";
import SubscribeChannel from './subscription/SubscribeChannel';

const Sidebar = ({ navOpen }) => {
    const { darkMode } = useSelector(state => state.ui);

    const { accessToken, myChannel } = useSelector((state) => state.user);

    // const { subscription } = myChannel;

    return (
    <>
    <div className={`pl-4 pr-10 h-screen overflow-y-hidden hover:overflow-y-scroll hover:pr-[30px] py-2 w-full ${!navOpen && "hidden"} scrollbar-thin scrollbar-h-96 scrollbar-thumb-rounded-lg scrollbar-thumb-[#4b4b4b] scrollbar-track-[#ffffff]`} >
    <NavLink
        className={({ isActive }) =>
          isActive
            ? `flex items-center gap-6 font-medium mb-2 ${darkMode ? "bg-[#414141]" : "bg-[#e0e0e0]"} px-4 py-3 rounded-lg`
            : `flex items-center gap-6 mb-2 px-4 pr-8 py-3 ${darkMode ? "hover:bg-[#414141]" : "hover:bg-[#e7e7e7]"} rounded-lg`
        }
        to="/"
        end
      >
        <ImHome3 className={`text-xl text-black ${darkMode && "text-white"}`} />
        <span>Dashboard</span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
        isActive
        ? `flex items-center gap-6 font-medium mb-2 ${darkMode ? "bg-[#414141]" : "bg-[#e0e0e0]"} px-4 py-3 rounded-lg`
        : `flex items-center gap-6 mb-2 px-4 pr-8 py-3 ${darkMode ? "hover:bg-[#414141]" : "hover:bg-[#e7e7e7]"} rounded-lg`
    }
        to="/subscriptions"
        end
      >
        <MdOutlineSubscriptions className={`text-xl text-black ${darkMode && "text-white"}`} />
        <span>Subscriptions</span>
      </NavLink>
      <hr />
      {/* <NavLink
        className={({ isActive }) =>
          isActive
            ? `flex items-center gap-6 font-medium mb-2 ${darkMode ? "bg-[#414141]" : "bg-[#e0e0e0]"} px-4 pr-8 py-3 rounded-lg`
            : `flex items-center gap-6 mb-2 px-4 pr-8 py-3`
        }
        to="/subscriptions"
        end
      >
        <h2 className='text-lg font-medium mt-4'>You <span className='ml-2'>{">"}</span></h2>
      </NavLink> */}
      <NavLink
        className={({ isActive }) =>
        isActive
        ? `flex items-center gap-6 font-medium mt-2 mb-2 ${darkMode ? "bg-[#414141]" : "bg-[#e0e0e0]"} px-4 py-3 rounded-lg`
        : `flex items-center gap-6 mb-2 px-4 pr-8 py-3 mt-2 ${darkMode ? "hover:bg-[#414141]" : "hover:bg-[#e7e7e7]"} rounded-lg`
    }
        to="/my-channel"
        end
      >
        <BsPersonSquare className={`text-xl text-black ${darkMode && "text-white"}`} />
        <span>Your channel</span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
        isActive
        ? `flex items-center gap-6 font-medium mb-2 ${darkMode ? "bg-[#414141]" : "bg-[#e0e0e0]"} px-4 py-3 rounded-lg`
        : `flex items-center gap-6 mb-2 px-4 pr-8 py-3 ${darkMode ? "hover:bg-[#414141]" : "hover:bg-[#e7e7e7]"} rounded-lg`
    }
        to="/history"
        end
      >
        <VscHistory className={`text-xl text-black ${darkMode && "text-white"}`} />
        <span>History</span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
        isActive
        ? `flex items-center gap-6 font-medium mb-2 ${darkMode ? "bg-[#414141]" : "bg-[#e0e0e0]"} px-4 py-3 rounded-lg`
        : `flex items-center gap-6 mb-2 px-4 pr-8 py-3 ${darkMode ? "hover:bg-[#414141]" : "hover:bg-[#e7e7e7]"} rounded-lg`
    }
        to="/like-video"
        end
      >
        <BiLike className={`text-xl text-black ${darkMode && "text-white"}`} />
        <span>Liked Video</span>
      </NavLink>
      <hr />
        <h2 className='text-lg font-medium mt-4 ml-3'>Subscriptions</h2>
        {
          myChannel &&
          myChannel.subscription.map((sub, i) => (
            <SubscribeChannel sub={sub} key={i} />
          ))
        }
    </div>
  </>
  )
}

export default Sidebar