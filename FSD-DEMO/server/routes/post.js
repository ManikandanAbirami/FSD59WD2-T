const express = require("express");
const multer = require("multer");
const Post = require("../models/Post");
const auth = require("../middleware/auth");
const router = express.Router();
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../client/public/images"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// create a new post
router.post("/", auth, upload.single("image"), async (req, res) => {
  const { content } = req.body;

  try {
    const newPost = new Post({
      user: req.user._id,
      content,
      image: req.file ? `public/images/${req.file.filename}` : "",
    });

    const post = await newPost.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Get all posts
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", ["username", "profilePicture"])
      .sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Like a post
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.likes.includes(req.user._id)) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.push(req.user._id);
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Comment on a post
router.post("/comment/:id", auth, async (req, res) => {
  const { text } = req.body;

  try {
    const post = await Post.findById(req.params.id);

    const newComment = {
      user: req.user._id,
      text,
    };

    post.comments.push(newComment);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
