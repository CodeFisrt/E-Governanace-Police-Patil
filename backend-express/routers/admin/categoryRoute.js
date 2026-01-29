const express = require("express");
const router = express.Router();

const {
  addCategory,
  getAllCategories,
  getCategoryCount,
  updateCategory,
  deleteCategory,
} = require("../../controllers/admin/categoryController");

const { authMiddleware } = require("../../middleware/authMiddleware");

router.post("/addcategory", authMiddleware, addCategory);
router.get("/getallcategories", authMiddleware, getAllCategories);
router.get("/category-count", authMiddleware, getCategoryCount);
router.put("/updatecategory/:id", authMiddleware, updateCategory);
router.delete("/deletecategory/:id", authMiddleware, deleteCategory);

module.exports = router;
