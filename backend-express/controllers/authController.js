const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { first_name, last_name, phone, role, password_hash, police_station_id } = req.body;

  const hash = await bcrypt.hash(password_hash, 10);

  try {
    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, phone, role, password_hash, police_station_id )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;`,
      [first_name, last_name, phone, role, hash, police_station_id],
    );

    console.log(result.rows[0]);
    res
      .status(201)
      .json({ msg: "Successfully created a entry", user: result.rows[0] });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

exports.login = async (req, res) => {
  const { phone, password_hash } = req.body;
  const hash = await bcrypt.hash(password_hash, 10);

  try {
    const result = await pool.query(`SELECT * FROM users WHERE phone = $1`, [
      phone,
    ]);

    const user = result.rows[0];
    console.log(user);

    const valid = await bcrypt.compare(password_hash, user.password_hash);
    console.log(hash);

    if (!valid) return res.status(401).json({ msg: "Invalid Password" });
    const token = jwt.sign({ id: user.user_id, role: user.role }, "secret123", {
      expiresIn: "1d",
    });
    res.status(200).json({ user: user.first_name, role: user.role, token });
    console.log(res);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllUserDetail = async (req, res) => {
  try {
    let result = await pool.query(`SELECT * FROM users`);
    // Return empty array if no users found instead of 400 error
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update user by ID
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, phone, role, password_hash } = req.body;

  try {
    let updateQuery = `UPDATE users SET first_name = $1, last_name = $2, phone = $3, role = $4`;
    let params = [first_name, last_name, phone, role];

    // If password is provided, hash and update it
    if (password_hash) {
      const hash = await bcrypt.hash(password_hash, 10);
      updateQuery += `, password_hash = $5`;
      params.push(hash);
      params.push(id);
    } else {
      params.push(id);
    }

    updateQuery += ` WHERE user_id = $${params.length} RETURNING *;`;

    const result = await pool.query(updateQuery, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    res
      .status(200)
      .json({ msg: "User updated successfully", user: result.rows[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM users WHERE user_id = $1 RETURNING *;`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

// Get user count by role
exports.getUserCountByRole = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT role, COUNT(*) as count FROM users GROUP BY role`,
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
