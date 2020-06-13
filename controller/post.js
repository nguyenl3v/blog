const Post = require("../model/post");
const CategoryPost = require("../model/categoryPost");

module.exports.getAll = async function (req, res) {
  const post = await Post.find()
    .populate("userId", "-password")
    .populate("catePost")
    .exec();
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
    post.save(function () {
      const cate = new CategoryPost({
        userId,
      });
      cate.save();
    });
    res.json({ msg: "create post success" });
  } else {
    res.status(404).json({ msg: "userId is not defined" });
  }
};

module.exports.getOne = async function (req, res) {
  const { id } = req.params;

  const post = await Post.findOne({ _id: id }).populate("catePost").exec();
  res.json(post);
};

module.exports.getByUser = async function (req, res) {
  const { id } = req.params;
  const post = await Post.findOne({ userId: id }).populate("catePost").exec();
  res.status(200).json(post);
};

module.exports.update = async function (req, res) {
  const { like, dislike } = req.body;
  const id = req.params.id;
  const userId = req.params.userId;
  if (
    typeof like === "boolean" &&
    typeof dislike === "boolean" &&
    id.length > 0
  ) {
    const cate = await CategoryPost.findById({ _id: id });
    if (cate) {
      cate.like = like;
      cate.dislike = dislike;
      await cate.save();
      res.status(201).json({ msg: "update success" });
    } else {
      const cate = new CategoryPost({
        userId,
        like,
        dislike,
        likeCount,
        dislikeCount
      });
      cate.save(async function(){
        const post = await Post.findOne({_id:id});
        post.likeCount = likeCount;
        post.dislikeCount = dislikeCount;
        post.save();
      });
      res.status(201).json({ msg: "update success" });
      Post.findOneAndUpdate(
        { _id: id },
        {
          $push: {
            catePost: cate._id,
          },
          $set: { likeCount: like ? 1 : 0, dislikeCount: dislike ? 1 : 0 },
        },
        function (err, post) {
          if (err) {
            console.log(err);
          }
          post.save();
        }
      );
    }
  } else {
    res.status(404).json({ msg: "like and dislike is not number" });
  }
};

module.exports.deletePostId = async function (req, res) {
  const { id } = req.params;

  const post = await Post.findByIdAndRemove({ _id: id });
  post.save();
  res.status(200).json({ msg: "delete post success" });
};
