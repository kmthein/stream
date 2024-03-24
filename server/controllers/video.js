const axios = require("axios");
const fs = require("fs");
const { v2: cloudinary } = require("cloudinary");
require("dotenv").config();

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
  console.log(req.body);
  console.log(req.file);
  const file = req.file;
  cloudinary.uploader.upload(
    file.path,
    { public_id: "thumbnail" }).then((data) => {
        console.log(data.secure_url);
      })
      .catch((err) => {
        console.err(err);
        return res.status(200).json({
          success: false,
          message: "Upload failed.",
        });
      });
};
