const express = require("express");
const router = express.Router();

const {
  getAllExperiences,
  getExperienceById,
  addExperience,
  deleteExperience
} = require("../controllers/experiences.controller");

router.get("/", getAllExperiences);
router.get("/:id", getExperienceById);

router.post("/", addExperience);
router.delete("/:id", deleteExperience);

module.exports = router;