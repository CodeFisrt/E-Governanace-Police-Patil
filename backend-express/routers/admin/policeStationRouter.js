const express = require("express");
const {
  addPoliceStation,
} = require("../../controllers/admin/policeStationController");

const { authMiddleware } = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("/addstation", addPoliceStation, authMiddleware);

module.exports = router;
