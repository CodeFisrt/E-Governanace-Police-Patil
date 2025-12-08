const express = require("express");
const {
  register,
  login,
  getUserDetail,
} = require("../controllers/authController");

const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getdetails", authMiddleware, getUserDetail);

module.exports = router;
