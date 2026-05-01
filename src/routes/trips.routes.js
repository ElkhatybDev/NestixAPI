const express = require("express");
const router = express.Router();

const {
  getAllTrips,
  getTripById,
  addTrip,
  updateTrip,
  deleteTrip,
  getTripBookings,
  getTripReviews,
  getTripExperiences
} = require("../controllers/trips.controller");

//relation
router.get("/:id/bookings", getTripBookings);
router.get("/:id/reviews", getTripReviews);
router.get("/:id/experiences", getTripExperiences);


router.get("/", getAllTrips);
router.get("/:id", getTripById);
router.post("/", addTrip);
router.put("/:id", updateTrip);
router.delete("/:id", deleteTrip);

module.exports = router;