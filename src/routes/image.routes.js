const express = require("express");
const router = express.Router();

const { generateImage } = require("../controllers/image.controller");

router.get("/", generateImage);

module.exports = router;