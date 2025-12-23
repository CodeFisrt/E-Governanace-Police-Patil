const express = require("express");
const {
  addPoliceStation,
  getAllPoliceStations,
} = require("../../controllers/admin/policeStationController");

const { authMiddleware } = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("/addstation", addPoliceStation, authMiddleware);

// for getting the all list of police station listed
router.get("/getallpolicestation", getAllPoliceStations, authMiddleware);

module.exports = router;
