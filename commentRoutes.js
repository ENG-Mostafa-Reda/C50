const router = require("express").Router();
const controller = require("../controllers/commentController");

router.post("/", controller.bulkCreate);
router.patch("/:commentId", controller.updateComment);
router.post("/find-or-create", controller.findOrCreate);
router.get("/search", controller.search);
router.get("/newest/:postId", controller.newest);
router.get("/details/:id", controller.details);

module.exports = router;