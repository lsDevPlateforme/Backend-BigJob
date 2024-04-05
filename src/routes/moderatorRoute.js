const express = require("express");
const router = express.Router();
const { requireRole } = require("../middlewares/authMiddleware");
const moderatorController = require("../controllers/moderatorController");

router.get("/dates", requireRole("moderator"), moderatorController.getAllDates);

router.put(
  "/dates/:dateId",
  requireRole("moderator"),
  moderatorController.updateDateStatus
);

module.exports = router;
