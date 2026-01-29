const express = require("express");
const { getDashboardStats } = require("../../controllers/admin/dashboardController");
const { authMiddleware } = require("../../middleware/authMiddleware");

const router = express.Router();

router.get("/dashboard-stats", authMiddleware, getDashboardStats);

module.exports = router;
