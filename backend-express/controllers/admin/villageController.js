const pool = require("../../config/db");

exports.addVillage = async (req, res) => {
  const { village_name, taluka, district, station_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO villages (village_name, taluka, district, station_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [village_name, taluka, district, station_id]
    );

    console.log(result.rows[0]);
    res.status(201).json({ msg: "Village Added Successfully" });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};
