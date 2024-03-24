const { Schema, model } = require("mongoose");

const videoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnails: {
        type: String,
    },
    tags: {
        type: [String]
    },
    videoUrl: {
        type: String,
        required: true
    },
    view: {
        type: Number,
        default: 0
    },
    like: {
        type: [String]
    },
    dislike: {
        type: [String]
    },
})

const videoModel = model("Video", videoSchema);

module.exports = videoModel;