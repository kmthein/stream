import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, SearchCheckIcon, SearchIcon } from "lucide-react";
import IMAGES from "@/assets/images/Images";
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  useDisclosure,
} from "@chakra-ui/react";
import { Switch } from "@/components/ui/switch";
import { useDispatch, useSelector } from "react-redux";
import { colorToggle } from "@/store/slices/uiSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MdOutlineCancel } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { IoMdArrowBack } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { setAccessToken, setMyChannel } from "@/store/slices/userSlice";
import { RiVideoAddLine } from "react-icons/ri";
import { useIsFetching } from '@tanstack/react-query';

const Navbar = () => {
  const dispatch = useDispatch();

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") ? true : false
  );

  const { darkMode } = useSelector((state) => state.ui);

  const { user } = useSelector((state) => state.user);

  const toggleColorTheme = () => {
    dispatch(colorToggle());
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", "dark");
    if (darkMode) {
      localStorage.removeItem("theme");
    }
  };

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (search != "") {
      navigate(`/results/search/${search}`);
    }
    setSearch("");
    onClose();
  };

  const logoutHandler = async () => {
    window.open(`${import.meta.env.VITE_API}/auth/logout`, "_self");
    dispatch(setMyChannel(null));
    dispatch(setAccessToken(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const isFetching = useIsFetching();

  return (
    <div className="flex px-4 w-full justify-between py-3 items-center">
      <div id="main-header-loading">{isFetching > 0 && <progress />}</div>
      <div className="">
        <Link to="/">
          <img src={IMAGES.logo} alt="logo" className="w-16" />
        </Link>
      </div>
      <div className="hidden xl:block">
        <form
          onSubmit={searchSubmitHandler}
          className="flex w-full items-center"
        >
          <Input
            type="text"
            placeholder="Search"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-br-none outline-none rounded-tr-none dark:bg-[#222222] dark:border-0 text-base xl:w-80 ml-14"
          />
          <Button
            type="submit"
            className="rounded-bl-none rounded-tl-none bg-gray-100 hover:bg-gray-200 dark:bg-[#4d4c4c]"
          >
            <SearchIcon className="text-black dark:text-white" />
          </Button>
        </form>
      </div>
      <div className="flex items-center gap-5 ml-[45%] md:ml-[75%] xl:ml-0">
            {user && (
              <Link to="/upload">
                <RiVideoAddLine className="text-[26px] text-gray-800 dark:text-white cursor-pointer" />
              </Link>
            )}
        <div className="flex items-center space-x-2">
          <Switch
            onClick={toggleColorTheme}
            checked={isDarkMode}
            className={`dark:bg-[#7a7a7a] dark:text-white `}
            isDarkMode={isDarkMode}
          />
        </div>
        <Bell size={24} strokeWidth={1.25} className="hidden xl:block" />
        <div className="hidden xl:block">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar name={`${user.name}`} size={"sm"} src={user.picture} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem onClick={logoutHandler}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <button>Sign In</button>
            </Link>
          )}
        </div>
      </div>
      {/* <Modal onClose={onClose} size={"xs"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
        <form onSubmit={searchSubmitHandler} className="flex w-full items-center">
        <Input
          type="text"
          placeholder="Search"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-br-none outline-none rounded-tr-none dark:bg-[#222222] dark:border-0 text-base xl:w-80"
        />
        <Button
          type="submit"
          className="rounded-bl-none rounded-tl-none bg-gray-100 hover:bg-gray-200 dark:bg-[#4d4c4c]"
        >
          <SearchIcon className="text-black dark:text-white" />
        </Button>
        </form>
        </ModalContent>
      </Modal> */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <SearchIcon
            className={`text-black dark:text-white xl:hidden ${
              isOpen && "text-black/20"
            }`}
          />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogCancel>
            <IoMdArrowBack className="text-black/80 dark:text-gray-200 outline-none text-2xl mt-16 mb-2" />
          </AlertDialogCancel>
          <div className="mt-2 h-[100vh]">
            <form
              onSubmit={searchSubmitHandler}
              className="flex w-full items-center"
            >
              <Input
                type="text"
                placeholder="Search"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-br-none outline-none rounded-tr-none dark:bg-[#222222] dark:text-[#fff] dark:border-0 text-base xl:w-80"
              />
              <AlertDialogAction>
                <Button
                  type="submit"
                  className="rounded-bl-none rounded-tl-none bg-gray-100 hover:bg-gray-200 dark:bg-[#4d4c4c]"
                >
                  <SearchIcon className="text-black dark:text-white" />
                </Button>
              </AlertDialogAction>
            </form>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Navbar;
