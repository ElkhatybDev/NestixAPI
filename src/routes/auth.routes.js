const express = require("express");
const router = express.Router();

const {
  login,
  getAuthUser
} = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.post("/login", login);
router.get("/me", authMiddleware, getAuthUser);

module.exports = router;