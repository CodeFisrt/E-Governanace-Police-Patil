const pool = require("../../config/db");

exports.getAllVillages = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM villages");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching villages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createVillage = async (req, res) => {
  const { village_name, district, taluka } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO villages (village_name, district, taluka) VALUES ($1, $2, $3) RETURNING *;`,
      [village_name, district, taluka],
    );
    res.status(201).json({ msg: "Village created successfully", village: result.rows[0] });
  } catch (error) {
    console.error("Error creating village:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateVillage = async (req, res) => {
  const { id } = req.params;
  const { village_name, district, taluka } = req.body;
  try {
    const result = await pool.query(
      `UPDATE villages SET village_name = $1, district = $2, taluka = $3 WHERE village_id = $4 RETURNING *;`,
      [village_name, district, taluka, id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Village not found" });
    }
    res.status(200).json({ msg: "Village updated successfully", village: result.rows[0] });
  } catch (error) {
    console.error("Error updating village:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteVillage = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM villages WHERE village_id = $1 RETURNING *;`,
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Village not found" });
    }
    res.status(200).json({ msg: "Village deleted successfully" });
  } catch (error) {
    console.error("Error deleting village:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};