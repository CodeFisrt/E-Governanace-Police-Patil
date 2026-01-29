const express = require("express");
const {
  register,
  login,
  getAllUserDetail,
  updateUser,
  deleteUser,
  getUserCountByRole,
} = require("../controllers/authController");

const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getdetails", authMiddleware, getAllUserDetail);
router.put("/update/:id", authMiddleware, updateUser);
router.delete("/delete/:id", authMiddleware, deleteUser);
router.get("/user-count-by-role", authMiddleware, getUserCountByRole);

module.exports = router;
