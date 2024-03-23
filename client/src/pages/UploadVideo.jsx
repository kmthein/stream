import UploadForm from "@/components/video/UploadForm";
import React from "react";
import { useSelector } from "react-redux";

const UploadVideo = () => {
  const { menuOpen } = useSelector((state) => state.ui);

  return (
    <div
      className={`md:mx-8 flex flex-wrap gap-5 xl:pt-4 ${
        menuOpen && "ml-8 mr-0"
      }`}
    >
      <UploadForm />
    </div>
  );
};

export default UploadVideo;
