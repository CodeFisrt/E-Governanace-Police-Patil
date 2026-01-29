const pool = require("../../config/db");

// Add report
exports.addReport = async (req, res) => {
  const {
    report_title,
    description,
    location,
    category_id,
    user_id,
    report_date,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO reports (report_title, description, location, category_id, user_id, report_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
      [report_title, description, location, category_id, user_id, report_date],
    );

    res
      .status(201)
      .json({ msg: "Report added successfully", report: result.rows[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

// Get all reports
exports.getAllReports = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM reports ORDER BY report_date DESC`,
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get reports by user
exports.getReportsByUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM reports WHERE user_id = $1 ORDER BY report_date DESC`,
      [user_id],
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get report count
exports.getReportCount = async (req, res) => {
  try {
    const result = await pool.query(`SELECT COUNT(*) as count FROM reports`);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update report
exports.updateReport = async (req, res) => {
  const { id } = req.params;
  const { report_title, description, location, category_id, report_date } =
    req.body;

  try {
    const result = await pool.query(
      `UPDATE reports SET report_title = $1, description = $2, location = $3, category_id = $4, report_date = $5 WHERE report_id = $6 RETURNING *;`,
      [report_title, description, location, category_id, report_date, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Report not found" });
    }

    res
      .status(200)
      .json({ msg: "Report updated successfully", report: result.rows[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete report
exports.deleteReport = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM reports WHERE report_id = $1 RETURNING *;`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Report not found" });
    }

    res.status(200).json({ msg: "Report deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
