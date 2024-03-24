import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import ErrorStyle from "../auth/ErrorStyle";
import { BiImageAdd } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { MdVideoCall } from "react-icons/md";
import ReactPlayer from "react-player";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { submitUploadVideo, uploadVideo } from "@/api/video";
import { ProgressBar } from "react-loader-spinner";
import * as Yup from "yup";

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

  const VIDEO_FORMAT = ["video/mp4", "video/mkv"];

  const VideoUploadSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters.")
      .required("Title is required."),
    description: Yup.string()
      .min(3, "Description must be at least 3 characters.")
      .required("Description is required."),
    tags: Yup.string().required("Tag must have at least one."),
    // video: Yup.mixed().required("Video file is required to upload.").test(
    //   "VIDEO_FORMAT",
    //   "File type is not supported.",
    //   (value) => !value || VIDEO_FORMAT.includes(value.type)
    // ),
  });

  const [previewImages, setPreviewImages] = useState(null);
  const [images, setImages] = useState([]);
  const [imgCount, setImgCount] = useState(0);

  const handleThumbnailsChange = (event, setFieldValue) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setPreviewImages(URL.createObjectURL(selectedImage));
      setFieldValue("thumbnails", selectedImage);
    }
  };

  const [previewVideo, setPreviewVideo] = useState(null);
  const [video, setVideo] = useState("");
  const [videoUploading, setVideoUploading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: uploadVideo,
    onMutate: (data) => {
      setVideoUploading(true);
    },
    onSuccess: (data) => {
      setVideoUploading(false);
      setVideo(data.url);
    },
  });

  const handleVideoChange = async (event, setFieldValue) => {
    const reader = new FileReader();
    const selectedVideo = event.target.files[0];
    if (selectedVideo) {
      const preview = URL.createObjectURL(selectedVideo);
      setPreviewVideo(preview);
      setFieldValue("video", selectedVideo);
      const formData = new FormData();
      formData.append("video", selectedVideo);
      mutate({ video: selectedVideo });
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
    video: null,
  };

  const { mutate: submitMutate } = useMutation({
    mutationFn: submitUploadVideo,
  });

  const uploadSubmitHandler = async (values) => {
    const split = values.tags.split(",");
    const tags = split.map((tag) => tag.trim());
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("thumbnails", values.thumbnails);
    formData.append("videoUrl", video);
    // formData.append("tags", JSON.stringify(tags));
    formData.append("tags", tags);
    submitMutate({ formData });
  };

  return (
    <div className=" w-[50%]">
      <Formik
        initialValues={initialValues}
        validationSchema={VideoUploadSchema}
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
              <label>Thumbnail</label>
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
                {previewImages && (
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
                )}
              </div>
              <ErrorStyle>
                <ErrorMessage name="thumbnails" />
              </ErrorStyle>
            </div>
            <div className="my-6">
              <label>Tags <span className="text-black/50 text-sm">(each tag seperate by comma)</span></label>
              <Field
                type="text"
                name="tags"
                id="tags"
                className="border py-2 w-full rounded-md px-2 dark:bg-[#4d4d4d]"
              />
              <ErrorStyle>
                <ErrorMessage name="tags" />
              </ErrorStyle>
            </div>
            <div className="my-6">
              <label>Video</label>
              <div className="flex gap-2 flex-wrap">
                {videoUploading && (
                  <div className="border rounded-md w-full h-[360px] flex items-center justify-center cursor-pointer text-gray-500">
                    <ProgressBar
                      visible={true}
                      height="80"
                      width="80"
                      color="#4fa94d"
                      ariaLabel="progress-bar-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                )}
                {video && !videoUploading && (
                  <div className="">
                    <ReactPlayer url={video} width="100%" controls />
                  </div>
                )}
                {!video && !videoUploading && (
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
              <ErrorStyle>
                <ErrorMessage name="video" />
              </ErrorStyle>
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
