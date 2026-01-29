const pool = require("../../config/db");

exports.getAllPolicePatils = async (req, response) => {
  const { id } = req.param;

  try {
    const res = await pool.query(
      `SELECT * FROM users WHERE police_station_id = $1`,
      [police_station_id],
    );
    console.log(res.rows);

    response.status(200).json(res.rows);
  } catch (error) {
    console.log(error);
    response.json({ msg: error });
  }
};
