const express = require("express");
const router = express.Router();

const {
  getAllBookings,
  getBookingById,
  addBooking,
  deleteBooking
} = require("../controllers/bookings.controller");

router.get("/", getAllBookings);
router.get("/:id", getBookingById);

router.post("/", addBooking);
router.delete("/:id", deleteBooking);

module.exports = router;