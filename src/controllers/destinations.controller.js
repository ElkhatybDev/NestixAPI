const destinations = require("../data/destinations.json");
const paginate = require("../utils/paginate");

//relation
const trips = require("../data/trips.json");



const getAllDestinations = (req, res) => {
  let result = destinations;

  const { q, limit, skip, sort, order } = req.query;

  if (q) {
    const search = q.toLowerCase();

    result = result.filter(destination =>
      destination.name.toLowerCase().includes(search) ||
      destination.country.toLowerCase().includes(search)
    );
  }

  if (sort) {
    result = result.sort((destinationA, destinationB) => {
      const fieldA = String(destinationA[sort] || "").toLowerCase();
      const fieldB = String(destinationB[sort] || "").toLowerCase();

      if (order === "desc") return fieldA < fieldB ? 1 : -1;
      return fieldA > fieldB ? 1 : -1;
    });
  }

  const pagination = paginate(result, limit, skip);

  res.status(200).json({
    message: "Destinations fetched successfully",
    ...pagination
  });
};

const getDestinationById = (req, res) => {
  const id = parseInt(req.params.id);

  const destination = destinations.find(destination => destination.id === id);

  if (!destination) {
    return res.status(404).json({
      message: "Destination not found"
    });
  }

  res.status(200).json({
    message: "Destination found",
    data: destination
  });
};

const addDestination = (req, res) => {
  const newDestination = {
    id: destinations.length + 1,
    ...req.body
  };

  destinations.push(newDestination);

  res.status(201).json({
    message: "Destination added successfully",
    data: newDestination
  });
};

const updateDestination = (req, res) => {
  const id = parseInt(req.params.id);

  const destinationIndex = destinations.findIndex(destination => destination.id === id);

  if (destinationIndex === -1) {
    return res.status(404).json({
      message: "Destination not found"
    });
  }

  destinations[destinationIndex] = {
    ...destinations[destinationIndex],
    ...req.body
  };

  res.status(200).json({
    message: "Destination updated successfully",
    data: destinations[destinationIndex]
  });
};

const deleteDestination = (req, res) => {
  const id = parseInt(req.params.id);

  const destinationIndex = destinations.findIndex(destination => destination.id === id);

  if (destinationIndex === -1) {
    return res.status(404).json({
      message: "Destination not found"
    });
  }

  const deletedDestination = destinations.splice(destinationIndex, 1)[0];

  res.status(200).json({
    message: "Destination deleted successfully",
    data: deletedDestination
  });
};


const getDestinationTrips = (req, res) => {
  const destinationId = parseInt(req.params.id);

  const destination = destinations.find(destination => destination.id === destinationId);

  if (!destination) {
    return res.status(404).json({
      message: "Destination not found"
    });
  }

  const destinationTrips = trips.filter(trip => trip.destinationId === destinationId);

  res.status(200).json({
    message: "Destination trips fetched successfully",
    total: destinationTrips.length,
    data: destinationTrips
  });
};





module.exports = {
  getAllDestinations,
  getDestinationById,
  addDestination,
  updateDestination,
  deleteDestination,
  getDestinationTrips
};