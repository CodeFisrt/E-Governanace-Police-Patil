const express = require("express");
const { getAllVillages, createVillage, updateVillage, deleteVillage } = require("../../controllers/admin/villageController");
const { authMiddleware } = require("../../middleware/authMiddleware");

const router = express.Router();

router.get("/villages", authMiddleware, getAllVillages);
router.post("/villages", authMiddleware, createVillage);
router.put("/villages/:id", authMiddleware, updateVillage);
router.delete("/villages/:id", authMiddleware, deleteVillage);

module.exports = router;
