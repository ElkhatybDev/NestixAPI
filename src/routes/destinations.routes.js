const express = require("express");
const router = express.Router();

const {
  getAllDestinations,
  getDestinationById,
  addDestination,
  updateDestination,
  deleteDestination,
  getDestinationTrips
} = require("../controllers/destinations.controller");

//relation
router.get("/:id/trips", getDestinationTrips);


router.get("/", getAllDestinations);
router.get("/:id", getDestinationById);
router.post("/", addDestination);
router.put("/:id", updateDestination);
router.delete("/:id", deleteDestination);

module.exports = router;