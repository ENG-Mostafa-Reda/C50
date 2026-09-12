const router = require("express").Router();
const controller = require("../controllers/postController");

router.post("/", controller.createPost);
router.delete("/:postId", controller.deletePost);
router.get("/details", controller.details);
router.get("/comment-count", controller.commentCount);

module.exports = router;