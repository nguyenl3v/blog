const Post = require("../model/post");
module.exports.getAll = async function (req, res) {
  const post = await Post.find().populate("userId","-password");
  res.status(200).json(post);
};

module.exports.create = async function (req, res) {
  const { userId, title, thumbnail, video } = req.body;

  if (!!userId && !!title && !!thumbnail && !!video) {
    const post = new Post({
      userId,
      title,
      thumbnail,
      video,
    });
    post.save();
    res.json({ msg: "create post success" });
  } else {
    res.status(404).json({ msg: "userId is not defined" });
  }
};

module.exports.getOne = async function (req, res) {
  const { id } = req.params;

  const post = await Post.findOne({ _id: id });
  res.status(200).json(post);
};

module.exports.getByUser = async function (req, res) {
  const { id } = req.params;
  const post = await Post.findOne({ userId: id });
  res.status(200).json(post);
};

module.exports.deletePostId = async function (req, res) {
  const { id } = req.params;

  const post = await Post.findByIdAndRemove({ _id: id });
  post.save();
  res.status(200).json({msg: "delete post success"});
};
