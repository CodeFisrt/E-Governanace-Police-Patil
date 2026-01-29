const express = require("express");
const pool = require("../../config/db");
const bcrypt = require("bcryptjs");
const { authMiddleware } = require("../../middleware/authMiddleware");

const router = express.Router();

// Get all users
router.get("/users", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
});

// Add user
router.post("/users", authMiddleware, async (req, res) => {
  const {
    first_name,
    last_name,
    phone,
    password_hash,
    role,
    police_station_id,
  } = req.body;

  const hash = await bcrypt.hash(password_hash, 10);

  try {
    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, phone, password_hash, role, police_station_id) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
      [first_name, last_name, phone, hash, role, police_station_id],
    );

    res.status(201).json({
      msg: "User created successfully",
      user: result.rows[0],
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
});

// Update user
router.put("/users/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, phone, role, police_station_id } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users SET first_name = $1, last_name = $2, phone = $3, role = $4, police_station_id = $5 
       WHERE user_id = $6 RETURNING *;`,
      [first_name, last_name, phone, role, police_station_id, id],
    );

    res.status(200).json({
      msg: "User updated successfully",
      user: result.rows[0],
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
});

// Delete user
router.delete("/users/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM users WHERE user_id = $1;", [id]);
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
});

module.exports = router;
