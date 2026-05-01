const reviews = require("../data/reviews.json");
const users = require("../data/users.json");
const trips = require("../data/trips.json");
const paginate = require("../utils/paginate");

const getAllReviews = (req, res) => {
  let result = reviews;

  const { q, limit, skip, sort, order } = req.query;

  if (q) {
    const search = q.toLowerCase();

    result = result.filter(review =>
      review.comment.toLowerCase().includes(search) ||
      review.rating.toString().includes(search)
    );
  }

  if (sort) {
    result = result.sort((reviewA, reviewB) => {
      const fieldA = String(reviewA[sort] || "").toLowerCase();
      const fieldB = String(reviewB[sort] || "").toLowerCase();

      if (order === "desc") return fieldA < fieldB ? 1 : -1;
      return fieldA > fieldB ? 1 : -1;
    });
  }

  const pagination = paginate(result, limit, skip);

  const data = pagination.data.map(review => {
    const user = users.find(user => user.id === review.userId);
    const trip = trips.find(trip => trip.id === review.tripId);

    return {
      ...review,
      user: user
        ? {
            firstName: user.firstName,
            lastName: user.lastName
          }
        : null,
      trip: trip
        ? {
            title: trip.title,
            price: trip.price
          }
        : null
    };
  });

  res.status(200).json({
    message: "Reviews fetched successfully",
    total: pagination.total,
    limit: pagination.limit,
    skip: pagination.skip,
    data
  });
};

const getReviewById = (req, res) => {
  const id = parseInt(req.params.id);

  const review = reviews.find(review => review.id === id);

  if (!review) {
    return res.status(404).json({
      message: "Review not found"
    });
  }

  const user = users.find(user => user.id === review.userId);
  const trip = trips.find(trip => trip.id === review.tripId);

  res.status(200).json({
    message: "Review found",
    data: {
      ...review,
      user: user
        ? {
            firstName: user.firstName,
            lastName: user.lastName
          }
        : null,
      trip: trip
        ? {
            title: trip.title,
            price: trip.price
          }
        : null
    }
  });
};

const addReview = (req, res) => {
  const newReview = {
    id: reviews.length + 1,
    ...req.body
  };

  reviews.push(newReview);

  res.status(201).json({
    message: "Review added successfully",
    data: newReview
  });
};

const deleteReview = (req, res) => {
  const id = parseInt(req.params.id);

  const reviewIndex = reviews.findIndex(review => review.id === id);

  if (reviewIndex === -1) {
    return res.status(404).json({
      message: "Review not found"
    });
  }

  const deletedReview = reviews.splice(reviewIndex, 1)[0];

  res.status(200).json({
    message: "Review deleted successfully",
    data: deletedReview
  });
};

module.exports = {
  getAllReviews,
  getReviewById,
  addReview,
  deleteReview
};