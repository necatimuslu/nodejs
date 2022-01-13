const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
  creator: {
    type: String,
    default: "Necati",
  },
  name: {
    type: String,
    default: "",
  },
  tags: [String],
  image: {
    type: String,
    default: "",
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

exports.Post = mongoose.model("post", postSchema);
