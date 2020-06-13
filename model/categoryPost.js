const mongoose = require("mongoose");

const categoryPost = new mongoose.Schema({
  like: {
    type: Boolean,
    default: false,
  },
  dislike: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String,
  },
});

module.exports = new mongoose.model("categoryPost", categoryPost);
