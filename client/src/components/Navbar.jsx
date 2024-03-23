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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { ErrorMessage, Field, Form, Formik } from "formik";
import ErrorStyle from "./auth/ErrorStyle";
import { BiImageAdd } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { MdVideoCall } from "react-icons/md";

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

  const thumbnailsRef = useRef();
  const videoRef = useRef();

  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);
  const [imgCount, setImgCount] = useState(0);

  const handleThumbnailsChange = (event, setFieldValue) => {
    const selectedImages = event.target.files;
    const selectedImagesArray = Array.from(selectedImages);
    setImages((prev) => [...prev, ...selectedImagesArray]);
    setImgCount((prev) => prev + selectedImagesArray.length);

    const previewImagesArray = selectedImagesArray.map((img) => {
      return URL.createObjectURL(img);
    });
    setPreviewImages((prev) => prev.concat(previewImagesArray));
  };

  const [previewVideo, setPreviewVideo] = useState([]);

  const handleVideoChange = (event, setFieldValue) => {
    const selectedVideo = event.target.files[0];
    console.log(selectedVideo);
    if(selectedVideo) {
      setPreviewVideo(URL.createObjectURL(selectedVideo));
      console.log(previewVideo);
    }

  }

  const deleteHandler = (img) => {
    const indexToDelete = previewImages.findIndex((i) => i == img);

    if (indexToDelete != -1) {
      const updatedSelectedImg = [...images];
      updatedSelectedImg.splice(indexToDelete, 1);

      setImgCount((prev) => prev - 1);
      setImages(updatedSelectedImg);
      setPreviewImages(previewImages.filter((i) => i != img));
      URL.revokeObjectURL(img);
    }
  };

  return (
    <div className="flex px-4 w-full justify-between py-3 items-center">
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
        <Dialog>
          <DialogTrigger asChild>
            {user && (
              <RiVideoAddLine className="text-[26px] text-gray-800 dark:text-white cursor-pointer" />
            )}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogTitle>Upload new video</DialogTitle>
            <Formik>
              {({ errors, touched, values, setFieldValue }) => (
                <Form encType="multipart/form-data">
                  <div className="my-6">
                  <label>Title</label>
                    <Field
                      type="text"
                      name="title"
                      id="title"
                      className="border py-2 w-full rounded-md px-2 dark:bg-[#4d4d4d]"
                    />
                    <ErrorStyle>
                      <ErrorMessage name="title" />
                    </ErrorStyle>
                  </div>
                  <div className="my-6">
                  <label>Description</label>
                    <Field
                      name="description"
                      id="description"
                      as="textarea"
                      className="border py-2 w-full rounded-md px-2 dark:bg-[#4d4d4d]"
                    />
                    <ErrorStyle>
                      <ErrorMessage name="email" />
                    </ErrorStyle>
                  </div>
                  <div className="my-6">
                    <label>Thumbnails</label>
                    <div className="flex gap-2 flex-wrap">
                      <div
                        className="border rounded-md w-[80px] h-[80px] flex items-center justify-center cursor-pointer text-gray-500 hover:text-gray-800 hover:border-black/40"
                        onClick={() => thumbnailsRef.current.click()}
                      >
                        <BiImageAdd className=" text-2xl " />
                        <input
                          type="file"
                          name="thumbnails"
                          id="thumbnail"
                          ref={thumbnailsRef}
                          hidden
                          accept="image/png,image/jpg,image/jpeg"
                          onChange={(e) =>
                            handleThumbnailsChange(e, setFieldValue)
                          }
                        />
                      </div>
                      {previewImages &&
                        previewImages.map((img, i) => (
                          <div className=" w-[80px] border relative" key={i}>
                            <img
                              src={img}
                              className="w-full h-[80px] object-contain"
                            />
                            <FaTrashAlt
                              onClick={() => deleteHandler(img)}
                              className="z-50 absolute bottom-2 right-1 text-red-500 text-sm hover:text-red-600 cursor-pointer"
                            />
                          </div>
                        ))}
                    </div>
                    <ErrorStyle>
                      <ErrorMessage name="phone_num" />
                    </ErrorStyle>
                  </div>
                  <div className="my-6">
                    <label>Tags</label>
                    <Field
                      type="text"
                      name="tags"
                      id="tags"
                      className="border py-2 w-full rounded-md px-2 dark:bg-[#4d4d4d]"
                    />
                    <ErrorStyle>
                      <ErrorMessage name="password" />
                    </ErrorStyle>
                  </div>
                  <div className="my-6">
                  <label>Video</label>
                    <div className="flex gap-2 flex-wrap">
                      <div
                        className="border rounded-md w-full h-[130px] flex items-center justify-center cursor-pointer text-gray-500 hover:text-gray-800 hover:border-black/40"
                        onClick={() => videoRef.current.click()}
                      >
                        <MdVideoCall className=" text-2xl " />
                        <input
                          type="file"
                          name="video"
                          id="video"
                          ref={videoRef}
                          hidden
                          onChange={(e) =>
                            handleVideoChange(e, setFieldValue)
                          }
                        />
                      </div>
                      </div>
                  </div>
                  <div className="my-6">
                    <button
                      type="submit"
                      className="border py-2 w-full rounded-md px-2 bg-[#0E5DDD] text-white hover:bg-[#4779c9]"
                    >
                      Upload
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
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
