const { Post } = require("../models/post");

exports.listPosts = async (req, res) => {
  try {
    const listPosts = await Post.find({});
    if (!listPosts)
      return res
        .status(400)
        .json({ success: false, message: "post list not found" });
    res.status(200).send(listPosts);
  } catch (error) {
    console.log(error);
  }
};
exports.getPostById = async (req, res) => {
  try {
    const getPostById = await Post.findById(req.params.id);
    if (!getPostById)
      return res
        .status(400)
        .json({ success: false, message: "post  not found" });
    res.status(200).send(getPostById);
  } catch (error) {
    console.log(error);
  }
};
exports.createPost = async (req, res) => {
  try {
    let post = new Post({
      title: req.body.title,
      message: req.body.message,
      creator: req.body.creator,
      tags: req.body.tags,
      image: req.body.image,
      likeCount: req.body.likeCount,
    });
    post = await post.save();
    if (!post)
      return res
        .status(500)
        .json({ success: false, message: "post  not create" });
    res.status(201).send(post);
  } catch (error) {
    console.log(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const updatePost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        message: req.body.message,
        creator: req.body.creator,
        tags: req.body.tags,
        image: req.body.image,
        likeCount: req.body.likeCount,
      },
      { new: true }
    );
    if (!updatePost)
      return res
        .status(500)
        .json({ success: false, message: "post  not update" });
    res.status(200).send(updatePost);
  } catch (error) {
    console.log(error);
  }
};
exports.deletePost = (req, res) => {
  try {
    Post.findByIdAndRemove(req.params.id)
      .then((post) => {
        if (post)
          return res
            .status(200)
            .json({ success: true, message: "post delete" });
        else
          return res
            .status(400)
            .json({ success: false, message: "post not delete" });
      })
      .catch((err) => {
        return res.status(500).json({ success: false, error: err.message });
      });
  } catch (error) {
    console.log(error);
  }
};
exports.likeCount = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: "Unaauthenticated" });

    const post = await Post.findById(id);

    const updatePost = await Post.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );

    res.json(updatePost);
  } catch (error) {
    console.log(error);
  }
};
