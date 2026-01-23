const express = require("express");
const {
  register,
  login,
  getAllUserDetail,
} = require("../controllers/authController");

const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getdetails", authMiddleware, getAllUserDetail);

module.exports = router;
