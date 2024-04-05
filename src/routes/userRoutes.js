const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

router.get("/profile", verifyToken, userController.getProfile);

router.post("/dates", verifyToken, userController.addDate);

module.exports = router;
