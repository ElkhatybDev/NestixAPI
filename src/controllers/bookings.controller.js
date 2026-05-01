const bookings = require("../data/bookings.json");
const users = require("../data/users.json");
const trips = require("../data/trips.json");
const paginate = require("../utils/paginate");

const getAllBookings = (req, res) => {
  let result = bookings;

  const { limit, skip, sort, order, status } = req.query;

  if (status) {
    result = result.filter(booking =>
      booking.status.toLowerCase() === status.toLowerCase()
    );
  }

  if (sort) {
    result = result.sort((bookingA, bookingB) => {
      const fieldA = String(bookingA[sort] || "").toLowerCase();
      const fieldB = String(bookingB[sort] || "").toLowerCase();

      if (order === "desc") return fieldA < fieldB ? 1 : -1;
      return fieldA > fieldB ? 1 : -1;
    });
  }

  const pagination = paginate(result, limit, skip);

  const data = pagination.data.map(booking => {
    const user = users.find(user => user.id === booking.userId);
    const trip = trips.find(trip => trip.id === booking.tripId);

    return {
      ...booking,
      user: user ? {
        firstName: user.firstName,
        lastName: user.lastName
      } : null,
      trip: trip ? {
        title: trip.title,
        price: trip.price
      } : null
    };
  });

  res.status(200).json({
    message: "Bookings fetched successfully",
    total: pagination.total,
    limit: pagination.limit,
    skip: pagination.skip,
    data
  });
};

const getBookingById = (req, res) => {
  const id = parseInt(req.params.id);

  const booking = bookings.find(booking => booking.id === id);

  if (!booking) {
    return res.status(404).json({
      message: "Booking not found"
    });
  }

  const user = users.find(user => user.id === booking.userId);
  const trip = trips.find(trip => trip.id === booking.tripId);

  res.status(200).json({
    message: "Booking found",
    data: {
      ...booking,
      user: user ? {
        firstName: user.firstName,
        lastName: user.lastName
      } : null,
      trip: trip ? {
        title: trip.title,
        price: trip.price
      } : null
    }
  });
};

const addBooking = (req, res) => {
  const newBooking = {
    id: bookings.length + 1,
    ...req.body
  };

  bookings.push(newBooking);

  res.status(201).json({
    message: "Booking added successfully",
    data: newBooking
  });
};

const deleteBooking = (req, res) => {
  const id = parseInt(req.params.id);

  const bookingIndex = bookings.findIndex(booking => booking.id === id);

  if (bookingIndex === -1) {
    return res.status(404).json({
      message: "Booking not found"
    });
  }

  const deletedBooking = bookings.splice(bookingIndex, 1)[0];

  res.status(200).json({
    message: "Booking deleted successfully",
    data: deletedBooking
  });
};

module.exports = {
  getAllBookings,
  getBookingById,
  addBooking,
  deleteBooking
};