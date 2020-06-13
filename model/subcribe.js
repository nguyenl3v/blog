const mongoose = require("mongoose");

const subcribe = new mongoose.Schema({
  subcribe: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  likeId: { type: mongoose.Schema.Types.ObjectId, ref: "video" },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
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
});

module.exports = mongoose.model("subcribe", subcribe);
