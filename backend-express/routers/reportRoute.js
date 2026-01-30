const express = require("express");
const router = express.Router();

const {
  addReport,
  getAllReports,
  getReportsByUser,
  getReportCount,
  updateReport,
  deleteReport,
} = require("../controllers/policeStation/reportController");

const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/addreport", authMiddleware, addReport);
router.get("/getallreports", authMiddleware, getAllReports);
router.get("/getreports/:user_id", authMiddleware, getReportsByUser);
router.get("/report-count", authMiddleware, getReportCount);
router.put("/updatereport/:id", authMiddleware, updateReport);
router.delete("/deletereport/:id", authMiddleware, deleteReport);

module.exports = router;
