const router = require("express").Router();
const controller = require("../controllers/userController");

router.post("/signup", controller.signup);
router.put("/:id", controller.upsertUser);
router.get("/by-email", controller.findByEmail);
router.get("/:id", controller.findById);

module.exports = router;