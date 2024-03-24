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
    video: {
        type: Object,
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
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})

const videoModel = model("Video", videoSchema);

module.exports = videoModel;