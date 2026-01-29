const pool = require("../../config/db");

exports.addPoliceStation = async (req, res) => {
  const {
    police_station_name,
    station_phone,
    station_taluka,
    station_district,
    police_station_code,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO police_stations (station_name  ,phone, taluka, district , station_code) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [
        police_station_name,
        station_phone,
        station_taluka,
        station_district,
        police_station_code,
      ],
    );

    console.log(result.rows[0]);
    res
      .status(201)
      .json({
        msg: "Police Station Added Successfully",
        station: result.rows[0],
      });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

exports.getAllPoliceStations = async (req, res) => {
  try {
    let result = await pool.query(`SELECT * FROM police_stations`);
    if (result.rows[0] === 0)
      return res.status(400).json({ msg: "Police station not found" });

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Get police station count
exports.getPoliceStationCount = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT COUNT(*) as count FROM police_stations`,
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update police station
exports.updatePoliceStation = async (req, res) => {
  const { id } = req.params;
  const {
    police_station_name,
    station_phone,
    station_taluka,
    station_district,
    police_station_code,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE police_stations SET station_name = $1, phone = $2, taluka = $3, district = $4, station_code = $5 WHERE station_id = $6 RETURNING *;`,
      [
        police_station_name,
        station_phone,
        station_taluka,
        station_district,
        police_station_code,
        id,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Police station not found" });
    }

    res
      .status(200)
      .json({
        msg: "Police station updated successfully",
        station: result.rows[0],
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete police station
exports.deletePoliceStation = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM police_stations WHERE station_id = $1 RETURNING *;`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Police station not found" });
    }

    res.status(200).json({ msg: "Police station deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
