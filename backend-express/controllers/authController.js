const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { first_name, last_name, phone, role, password_hash } = req.body;

  const hash = await bcrypt.hash(password_hash, 10);

  try {
    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, phone, role, password_hash)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;`,
      [first_name, last_name, phone, role, hash]
    );

    console.log(result.rows[0]);
    res.status(201).json({ msg: "Successfully created a entry " });
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

    const valid = await bcrypt.compare(password_hash, user.password_hash);

    if (!valid) return res.status(401).json({ msg: "Invalid Password" });
    const token = jwt.sign({ id: user.user_id, role: user.role }, "secret123", {
      expiresIn: "1d",
    });
    res.status(200).json({ user: user.first_name, role: user.role, token });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllUserDetail = async (req, res) => {
  // const userId = req.user.id;
  try {
    let result = await pool.query(`SELECT * FROM users`);
    if (result.rows.length === 0)
      return res.status(400).json({ msg: "user not found" });
    res.status(200).json(result.rows);
    console.log(result.rows);
  } catch (error) {
    res.status(400).json(error);
  }
};
