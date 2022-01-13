const router = require("express").Router();

const postController = require("../controllers/postController");
const {
  createAngularPost,
  updateAngularPost,
  uploadOption,
} = require("../controllers/angularPostController");
router.get("/", postController.listPosts);
router.get("/:id", postController.getPostById);
router.post("/", postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.patch("/:id/likePost", postController.likeCount);
router.post("/angular", uploadOption.single("image"), createAngularPost);
router.put("/angular/:id", uploadOption.single("image"), updateAngularPost);
module.exports = router;
