const multer = require("multer");
const { Post } = require("../models/post");

const FILE_TYPE_MAP = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadlError = new Error("Invalid image type");
    if (isValid) {
      uploadlError = null;
    }
    cb(uploadlError, "uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

exports.uploadOption = multer({ storage: storage });

exports.createAngularPost = async (req, res) => {
  try {
    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;

    let post = new Post({
      title: req.body.title,
      message: req.body.message,
      creator: req.body.creator,
      tags: req.body.tags,
      image: `${basePath}${fileName}`,
      likeCount: req.body.likeCount,
    });
    post = await post.save();

    if (!post)
      return res
        .status(500)
        .json({ success: false, message: "post not created" });
    res.status(201).send(post);
  } catch (error) {
    console.log(error);
  }
};
exports.updateAngularPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("Invalid post Id");
    let newImage;
    if (req.body.image) {
      const fileName = req.file.filename;
      const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
      newImage = `${basePath}${fileName}`;
    } else {
      newImage = post.image;
    }
    const updatePost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        message: req.body.message,
        creator: req.body.creator,
        tags: req.body.tags,
        image: newImage,
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
