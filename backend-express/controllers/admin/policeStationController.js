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
      ]
    );

    console.log(result.rows[0]);
    res.status(201).json({ msg: "Police Station Added Successfully" });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};
