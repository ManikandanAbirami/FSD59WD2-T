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
      .populate("comments.user", ["username"])
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

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const userIndex = post.likes.indexOf(req.user.id);

    if (userIndex >= 0) {
      post.likes.splice(userIndex, 1); // Unlike the post
    } else {
      post.likes.push(req.user.id); // Like the post
    }
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

// Delete a comment
router.delete("/comment/:postId/:commentId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    //find the comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.commentId
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    // Get remove index
    const removeIndex = post.comments
      .map((comment) => comment.id)
      .indexOf(req.params.commentId);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
