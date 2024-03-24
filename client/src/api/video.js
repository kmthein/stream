import axios from "axios";

export const uploadVideo = async ({ video }) => {
  const formData = new FormData();
  formData.append("video", video);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API}/video/upload`,
      formData
    );
    console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const submitUploadVideo = async ({ formData }) => {
  console.log(formData);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API}/video/new-video`,
      formData
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
