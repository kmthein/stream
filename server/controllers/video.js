const axios = require("axios");
const fs = require("fs");
const { v2: cloudinary } = require("cloudinary");
require("dotenv").config();

const Video = require("../models/video");

cloudinary.config({
  cloud_name: "dvos6jlbp",
  api_key: "941877997462755",
  api_secret: process.env.API_SECRET,
});

exports.uploadVideo = async (req, res) => {
  const video = req.file;
  console.log(req.file);
  cloudinary.uploader
    .upload(video.path, {
      resource_type: "video",
      public_id: "stream",
    })
    .then((data) => {
      console.log(data.playback_url);
      return res.status(200).json({
        success: true,
        message: "Video upload completed.",
        url: data.playback_url,
      });
    })
    .catch((err) => {
      console.err(err);
      return res.status(200).json({
        success: false,
        message: "Video upload failed.",
      });
    });
};

exports.submitUploadNewVideo = async (req, res) => {
  // const tags = JSON.parse(req.body.tags);
  const { title, description, tags, videoUrl } = req.body;
  // console.log(tags);
  let thumbnails = "";
  try {
  const file = req.file;
    if (file) {
      const photoData = await cloudinary.uploader.upload(file.path, {
        public_id: "thumbnail",
      });
      thumbnails = photoData.secure_url;
    }
    const videoDoc = await Video.create({
      title,
      description,
      thumbnails,
      tags,
      videoUrl
    })
    if(videoDoc) {
      return res.status(200).json({
        success: true,
        message: "Video upload completed.",
        data: videoDoc,
      });
    } else {
      throw new Error("Video upload failed.")
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Upload failed.",
    });
  }
};
