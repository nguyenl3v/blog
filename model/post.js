const mongoose = require("mongoose");

const video = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  video: {
    type: String,
    required: true,
  },
  like: {
    type: Boolean,
    default: false,
  },
  dislike: {
    type: Boolean,
    default: false,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  dislikeCount: {
    type: Number,
    default: 0,
  },
  view: {
    type: Number,
    default: 0,
  },
  ctime: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("video", video);
