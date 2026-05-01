const express = require("express");
const router = express.Router();

const {
  getAllReviews,
  getReviewById,
  addReview,
  deleteReview
} = require("../controllers/reviews.controller");

router.get("/", getAllReviews);
router.get("/:id", getReviewById);

router.post("/", addReview);
router.delete("/:id", deleteReview);

module.exports = router;