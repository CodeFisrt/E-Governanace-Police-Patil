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
