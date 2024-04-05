const express = require("express");
const router = express.Router();
const { requireRole } = require("../middlewares/authMiddleware");
const adminController = require("../controllers/adminController");

router.get("/users", requireRole("admin"), adminController.getAllUsers);

router.put(
  "/users/:userId/role",
  requireRole("admin"),
  adminController.updateUserRole
);

module.exports = router;
