const express = require("express");
const pool = require("../../config/db");
const { authMiddleware } = require("../../middleware/authMiddleware");

const router = express.Router();

// Get all police stations
router.get("/police-stations", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM police_stations");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
});

// Add a new police station
router.post("/police-stations", authMiddleware, async (req, res) => {
  const { station_name, address, contact_number } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO police_stations (station_name, address, contact_number) 
       VALUES ($1, $2, $3) RETURNING *;`,
      [station_name, address, contact_number],
    );
    res.status(201).json({
      msg: "Police station added successfully",
      station: result.rows[0],
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
});

// Update a police station
router.put("/police-stations/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { station_name, address, contact_number } = req.body;
  try {
    const result = await pool.query(
      `UPDATE police_stations SET station_name = $1, address = $2, contact_number = $3 
       WHERE station_id = $4 RETURNING *;`,
      [station_name, address, contact_number, id],
    );
    res.status(200).json({
      msg: "Police station updated successfully",
      station: result.rows[0],
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
});

// Delete a police station
router.delete("/police-stations/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM police_stations WHERE station_id = $1;", [id]);
    res.status(200).json({ msg: "Police station deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
});

module.exports = router;
