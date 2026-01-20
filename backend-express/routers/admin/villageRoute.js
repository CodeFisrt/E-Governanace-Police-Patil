const express = require("express");
const router = express.Router();

const { addVillage } = require("../../controllers/admin/villageController");

router.post("/addvillage", addVillage);

module.exports = router;
