const pool = require("../../config/db");

// Add category
exports.addCategory = async (req, res) => {
  const { category_name, description } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO categories (category_name, description) VALUES ($1, $2) RETURNING *;`,
      [category_name, description],
    );

    res
      .status(201)
      .json({ msg: "Category added successfully", category: result.rows[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM categories`);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get category count
exports.getCategoryCount = async (req, res) => {
  try {
    const result = await pool.query(`SELECT COUNT(*) as count FROM categories`);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { category_name, description } = req.body;

  try {
    const result = await pool.query(
      `UPDATE categories SET category_name = $1, description = $2 WHERE category_id = $3 RETURNING *;`,
      [category_name, description, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res
      .status(200)
      .json({ msg: "Category updated successfully", category: result.rows[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM categories WHERE category_id = $1 RETURNING *;`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.status(200).json({ msg: "Category deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
