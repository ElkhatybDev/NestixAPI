const trips = require("../data/trips.json");
const paginate = require("../utils/paginate");
//relation
const destinations = require("../data/destinations.json");
const bookings = require("../data/bookings.json");
const users = require("../data/users.json");
const reviews = require("../data/reviews.json");
const experiences = require("../data/experiences.json");


const getAllTrips = (req, res) => {
    let result = trips;

    const { q, limit, skip, sort, order } = req.query;

    if (q) {
    const search = q.toLowerCase();

    result = result.filter(trip => {
    const destination = destinations.find(
        d => d.id === trip.destinationId
    );

    return (
        trip.title.toLowerCase().includes(search) ||
        trip.description.toLowerCase().includes(search) ||
        trip.price.toString().includes(search) ||
        destination?.name.toLowerCase().includes(search) ||
        destination?.country.toLowerCase().includes(search)
    );
    });
}

    if (sort) {
    result = result.sort((a, b) => {
        const A = String(a[sort] || "").toLowerCase();
        const B = String(b[sort] || "").toLowerCase();

        if (order === "desc") return A < B ? 1 : -1;
        return A > B ? 1 : -1;
    });
    }

    const pagination = paginate(result, limit, skip);

    res.status(200).json({
    message: "Trips fetched successfully",
    ...pagination
    });
};

const getTripById = (req, res) => {
    const id = parseInt(req.params.id);

    const trip = trips.find(t => t.id === id);

    if (!trip) {
    return res.status(404).json({
        message: "Trip not found"
    });
    }

    res.status(200).json({
    message: "Trip found",
    data: trip
    });
};

const addTrip = (req, res) => {
    const newTrip = {
    id: trips.length + 1,
    ...req.body
    };

    trips.push(newTrip);

    res.status(201).json({
    message: "Trip added successfully",
    data: newTrip
    });
};

const updateTrip = (req, res) => {
    const id = parseInt(req.params.id);

    const index = trips.findIndex(t => t.id === id);

    if (index === -1) {
    return res.status(404).json({
        message: "Trip not found"
    });
    }

    trips[index] = {
    ...trips[index],
    ...req.body
    };

    res.status(200).json({
    message: "Trip updated successfully",
    data: trips[index]
    });
};

const deleteTrip = (req, res) => {
    const id = parseInt(req.params.id);

    const index = trips.findIndex(t => t.id === id);

    if (index === -1) {
    return res.status(404).json({
        message: "Trip not found"
    });
    }

    const deleted = trips.splice(index, 1)[0];

    res.status(200).json({
    message: "Trip deleted successfully",
    data: deleted
    });
};

const getTripBookings = (req, res) => {
  const tripId = parseInt(req.params.id);

  const trip = trips.find(trip => trip.id === tripId);

  if (!trip) {
    return res.status(404).json({
      message: "Trip not found"
    });
  }

  const tripBookings = bookings.filter(booking => booking.tripId === tripId);

  const data = tripBookings.map(booking => {
    const user = users.find(user => user.id === booking.userId);

    return {
      ...booking,
      user: user
        ? {
            firstName: user.firstName,
            lastName: user.lastName
          }
        : null
    };
  });

  res.status(200).json({
    message: "Trip bookings fetched successfully",
    total: data.length,
    data
  });
};


const getTripReviews = (req, res) => {
  const tripId = parseInt(req.params.id);

  const trip = trips.find(trip => trip.id === tripId);

  if (!trip) {
    return res.status(404).json({
      message: "Trip not found"
    });
  }

  const tripReviews = reviews.filter(review => review.tripId === tripId);

  const data = tripReviews.map(review => {
    const user = users.find(user => user.id === review.userId);

    return {
      ...review,
      user: user
        ? {
            firstName: user.firstName,
            lastName: user.lastName
          }
        : null
    };
  });

  res.status(200).json({
    message: "Trip reviews fetched successfully",
    total: data.length,
    data
  });
};

const getTripExperiences = (req, res) => {
  const tripId = parseInt(req.params.id);

  const trip = trips.find(t => t.id === tripId);

  if (!trip) {
    return res.status(404).json({
      message: "Trip not found"
    });
  }

  const tripExperiences = experiences.filter(
    exp => exp.tripId === tripId
  );

  const data = tripExperiences.map(exp => {
    const user = users.find(u => u.id === exp.userId);

    return {
      ...exp,
      user: user
        ? {
            firstName: user.firstName,
            lastName: user.lastName
          }
        : null
    };
  });

  res.status(200).json({
    message: "Trip experiences fetched successfully",
    total: data.length,
    data
  });
};


module.exports = {
    getAllTrips,
    getTripById,
    addTrip,
    updateTrip,
    deleteTrip,
    getTripBookings,
    getTripReviews,
    getTripExperiences
};