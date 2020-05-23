const mongoose = require("mongoose");

const upload = new mongoose.Schema({
  upload: {
    type: String,
    default: null,
  }
});

module.exports = mongoose.model("upload", upload);
