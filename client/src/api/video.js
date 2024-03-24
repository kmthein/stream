import axios from "axios";
import { getUpdateLocalStorage } from "./axiosInstance";

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
  const token = getUpdateLocalStorage();
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API}/video/new-video`,
      formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllVideos = async ({ signal }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API}/video/all`, { signal }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
}

export const getSingleVideo = async ({signal, id}) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API}/video/${id}`, { signal }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
}