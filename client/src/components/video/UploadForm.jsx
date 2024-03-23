import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import ErrorStyle from "../auth/ErrorStyle";
import { BiImageAdd } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { MdVideoCall } from "react-icons/md";
import ReactPlayer from "react-player";
import axios from "axios";


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadForm = () => {
  const thumbnailsRef = useRef();
  const videoRef = useRef();

  const [previewImages, setPreviewImages] = useState(null);
  const [images, setImages] = useState([]);
  const [imgCount, setImgCount] = useState(0);

  const handleThumbnailsChange = (event, setFieldValue) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setPreviewImages(URL.createObjectURL(selectedImage));
      setFieldValue("thumbnails", selectedImage);
      setFiles((prev) => [...prev, selectedImage])
    }
  };

  const [previewVideo, setPreviewVideo] = useState(null);
  const [video, setVideo] = useState(null);

  const [files, setFiles] = useState([]);

  const handleVideoChange = async (event, setFieldValue) => {
    const reader = new FileReader();
    const selectedVideo = event.target.files[0];
    if (selectedVideo) {
      const preview = URL.createObjectURL(selectedVideo);
      setPreviewVideo(preview);
      setFieldValue("video", selectedVideo);
      setFiles((prev) => [...prev, selectedVideo])
    }
  };

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

  const initialValues = {
    title: "",
    description: "",
    thumbnails: null,
    tags: [],
    video: null
  };

  const uploadSubmitHandler = async (values) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("thumbnails", images);
    formData.append("video", video);
    const response = await axios.post(
      `${import.meta.env.VITE_API}/video/upload`,formData
    );
  };

  return (
    <div className=" w-[50%]">
      <Formik
        initialValues={initialValues}
        onSubmit={uploadSubmitHandler}
        enableReinitialize={true}
      >
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
                <ErrorMessage name="description" />
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
                    id="thumbnails"
                    ref={thumbnailsRef}
                    hidden
                    accept="image/png,image/jpg,image/jpeg"
                    onChange={(e) => handleThumbnailsChange(e, setFieldValue)}
                  />
                </div>
                {previewImages &&
                    <div className=" w-[80px] border relative">
                      <img
                        src={previewImages}
                        className="w-full h-[80px] object-contain"
                      />
                      <FaTrashAlt
                        onClick={() => deleteHandler(img)}
                        className="z-50 absolute bottom-2 right-1 text-red-500 text-sm hover:text-red-600 cursor-pointer"
                      />
                    </div>
                  }
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
                {previewVideo ? (
                  <div className="">
                    <ReactPlayer url={previewVideo} width={"100%"} controls />
                  </div>
                ) : (
                  <div
                    className="border rounded-md w-full h-[360px] flex items-center justify-center cursor-pointer text-gray-500 hover:text-gray-800 hover:border-black/40"
                    onClick={() => videoRef.current.click()}
                  >
                    <MdVideoCall className=" text-2xl " />
                    <input
                      type="file"
                      name="video"
                      id="video"
                      ref={videoRef}
                      accept="video/*"
                      hidden
                      onChange={(e) => handleVideoChange(e, setFieldValue)}
                    />
                  </div>
                )}
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
    </div>
  );
};

export default UploadForm;
