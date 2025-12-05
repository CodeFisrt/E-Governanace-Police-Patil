const pool = require("../config/db");
const bcrypt = require("bcryptjs");

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
