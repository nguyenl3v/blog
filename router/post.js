const express = require("express");
const router = express.Router();
const Post = require("../controller/post");
const uploadFile = require("../controller/upload");
const multer = require('multer');
const auth = require("../middleware/auth").auth;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './publish/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  }
});
const upload = multer({ storage: storage });

router.get("/api/data/post",Post.getAll);
router.post("/api/upload",auth,upload.any(),uploadFile.upload);
router.post("/api/create/post",auth,Post.create);
router.get("/api/getbyid/:id",auth,Post.getOne);
router.get("/api/getbyuser/:id",auth,Post.getByUser);
router.put("/api/post/update/:id/:userId",auth,Post.update);
router.delete("/api/deletePost/:id",auth,Post.deletePostId);

module.exports = router;