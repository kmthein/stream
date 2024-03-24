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
  const publicId = Date.now() + "_" + Math.round(Math.random() * 1e9) + "_" + video.originalname
  cloudinary.uploader
    .upload(video.path, {
      resource_type: "video",
      public_id: publicId,
    })
    .then((data) => {
      return res.status(200).json({
        success: true,
        message: "Video upload completed.",
        data: {
          url: data.playback_url,
          publicId: data.public_id,
          duration: data.duration
        },
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
  const { title, description } = req.body;
  const tags = JSON.parse(req.body.tags);
  const video = JSON.parse(req.body.video);
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
      video,
      user: req.userId
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
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllVideos = async (req, res) => {
  try {
    const videoDoc = await Video.find().populate("user", "name");
    if(!videoDoc) {
      throw new Error("Videos not found.");
    }
    return res.status(200).json({
      success: true,
      videos: videoDoc,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
}

exports.getSingleVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const videoDoc = await Video.findById(id).populate("user", "name");
    if(!videoDoc) {
      throw new Error("Video not found.");
    }
    return res.status(200).json({
      success: true,
      video: videoDoc,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
}