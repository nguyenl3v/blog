const mongoose = require("mongoose");

const subcribe = new mongoose.Schema({
  subcribe:[{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  likeId:[{ type: mongoose.Schema.Types.ObjectId, ref: 'video' }],
});

module.exports = new Model("subcribe",subcribe);