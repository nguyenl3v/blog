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
  view: {
    type: Number,
    default: 0,
  },
  ctime: {
    type: Date,
    default: Date.now(),
  },
  likeCount: {
    type:Number,
    default: 0,
  },
  dislikeCount: {
    type:Number,
    default: 0,
  },
  catePost: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "categoryPost",
  }],
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  }
});

module.exports = mongoose.model("video", video);
