const express = require("express");
const PostModel = require("../models/PostModel");
const CommentsModel = require("../models/CommentsModel");
const postRouter = express.Router();

postRouter.get("/blogs", async (req, res) => {
  const { title, category } = req.query;
  try {
    const post = await PostModel.find(req.query);

    res.status(200).send({ msg: "all the blogs", blogs: post });
  } catch (error) {
    res.status(200).send({ msg: "Unable to fetch any blog" });
  }
});

postRouter.post("/blogs", async (req, res) => {
  const payload = req.body;
  try {
    const post = await PostModel.create({
      ...payload,
      creator: req.userId,
    });

    return res
      .status(200)
      .send({ msg: "new post has been created", post: post });
  } catch (error) {
    res
      .status(400)
      .send({ msg: "Unable to add new post", error: error.message });
  }
});

postRouter.patch("/blogs/:id", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post.creator.toString() === req.userId) {
      const updatedPost = await PostModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res
        .status(200)
        .send({ msg: "The blog has been updated", updatedBlog: updatedPost });
    } else {
      res.status(201).send({ msg: "You are not authorized,cannot update" });
    }
  } catch (error) {
    res
      .status(400)
      .send({ msg: "Unable to update the blog", error: error.message });
  }
});

postRouter.delete("/blogs/:id", async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  try {
    if (req.body.userId === post.userId) {
      await PostModel.findByIdAndDelete(req.params.id);
      res.status(200).send({ msg: "Blog has been deleted" });
    } else {
      res.status(200).send({ msg: "Unable to delete blog" });
    }
  } catch (error) {
    res
      .status(400)
      .send({ msg: "Unable to delete blog", error: error.message });
  }
});

postRouter.patch("/blogs/likes/:id", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    post.likes += 1;
    const likes = await PostModel.findByIdAndUpdate(req.params.id, post, {
      new: true,
    });
    res.status(400).send({ msg: "Added like", like: likes });
  } catch (error) {
    res.status(400).send({ msg: "Unable to send likes", error: error.message });
  }
});

// postRouter.patch("/blogs/comment/:id", async (req, res) => {
//   const payload = req.body;

//   try {
//     const post = await PostModel.findById(req.params.id);
//     post.comments.push(payload);

//     const comments = await PostModel.findByIdAndUpdate(req.params.id, post, {
//       new: true,
//     });

//     return res
//       .status(200)
//       .send({ msg: "new comment has been added", comment: comments });
//   } catch (error) {
//     res
//       .status(400)
//       .send({ msg: "Unable to add new post", error: error.message });
//   }
// });

module.exports = postRouter;
