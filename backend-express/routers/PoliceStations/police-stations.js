const express = require("express");
const pool = require("../../config/db");

const router = express.Router();

// Get all police patils
router.get("/policepatils/:id", async (req, response) => {
  const { id } = req.params;

  try {
    const res = await pool.query(
      `SELECT * FROM users WHERE police_station_id = $1 AND role = $2`,
      [id, "police_patil"],
    );
    console.log(res.rows);

    response.status(200).json(res.rows);
  } catch (error) {
    console.log(error);
    response.json({ msg: error });
  }
});

module.exports = router;
