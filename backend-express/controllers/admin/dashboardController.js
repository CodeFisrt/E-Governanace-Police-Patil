const pool = require("../../config/db");

exports.getDashboardStats = async (req, res) => {
  try {
    const usersCountResult = await pool.query("SELECT COUNT(*) FROM users;");
    const stationsCountResult = await pool.query("SELECT COUNT(*) FROM police_stations;");
    const villagesCountResult = await pool.query("SELECT COUNT(*) FROM villages;");
    const reportsCountResult = await pool.query("SELECT COUNT(*) FROM reports;");

    res.status(200).json({
      users: parseInt(usersCountResult.rows[0].count),
      stations: parseInt(stationsCountResult.rows[0].count),
      villages: parseInt(villagesCountResult.rows[0].count),
      reports: parseInt(reportsCountResult.rows[0].count),
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};