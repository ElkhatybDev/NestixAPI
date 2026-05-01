const users = require("../data/users.json");
const paginate = require("../utils/paginate");
//import relation
const posts = require("../data/posts.json");
const bookings = require("../data/bookings.json");
const trips = require("../data/trips.json");
const reviews = require("../data/reviews.json");
const experiences = require("../data/experiences.json");


//
const getAllUsers = (req, res) => {
    let result = users;

    const { q, limit, skip, sort, order } = req.query;

    if (q) {
    const search = q.toLowerCase();

    result = result.filter(user =>
        user.firstName.toLowerCase().includes(search) ||
        user.lastName.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.address?.city?.toLowerCase().includes(search)
    );
    }

    if (sort) {
    result = result.sort((userA, userB) => {
    const fieldA = String(userA[sort] || "").toLowerCase();
    const fieldB = String(userB[sort] || "").toLowerCase();

    if (order === "desc") {
        return fieldA < fieldB ? 1 : -1;
    }

    return fieldA > fieldB ? 1 : -1;
    });
}

    const pagination = paginate(result, limit, skip);

    res.status(200).json({
        message: "Users fetched successfully",
        ...pagination
    });
};

//
const getUserById = (req, res) => {
    const id = parseInt(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
    return res.status(404).json({
        message: "User not found"
    });
    }

    res.status(200).json({
    message: "User found",
    data: user
    });
};

// (CRUD)

const addUser = (req, res) => {
    const newUser = {
    id: users.length + 1,
    ...req.body
    };

    users.push(newUser);

    res.status(201).json({
    message: "User added successfully",
    data: newUser
    });
};

//
const updateUser = (req, res) => {
    const id = parseInt(req.params.id);

    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
    return res.status(404).json({
        message: "User not found"
    });
    }

    users[userIndex] = {
    ...users[userIndex],
    ...req.body
    };

    res.status(200).json({
    message: "User updated successfully",
    data: users[userIndex]
    });
};

// 

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);

    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
    return res.status(404).json({
        message: "User not found"
    });
    }

    const deletedUser = users.splice(userIndex, 1);

    res.status(200).json({
    message: "User deleted successfully",
    data: deletedUser
    });
};

//relation 

const getUserPosts = (req, res) => {
    const userId = parseInt(req.params.id);

    const user = users.find(user => user.id === userId);

    if (!user) {
    return res.status(404).json({
        message: "User not found"
    });
    }

    const userPosts = posts.filter(post => post.userId === userId);

    res.status(200).json({
    message: "User posts fetched successfully",
    total: userPosts.length,
    data: userPosts
    });
};


const getUserBookings = (req, res) => {
  const userId = parseInt(req.params.id);

  const user = users.find(user => user.id === userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  const userBookings = bookings.filter(booking => booking.userId === userId);

  const data = userBookings.map(booking => {
    const trip = trips.find(trip => trip.id === booking.tripId);

    return {
      ...booking,
      trip: trip
        ? {
            title: trip.title,
            price: trip.price,
            duration: trip.duration
          }
        : null
    };
  });

  res.status(200).json({
    message: "User bookings fetched successfully",
    total: data.length,
    data
  });
};

const getUserReviews = (req, res) => {
  const userId = parseInt(req.params.id);

  const user = users.find(user => user.id === userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  const userReviews = reviews.filter(review => review.userId === userId);

  const data = userReviews.map(review => {
    const trip = trips.find(trip => trip.id === review.tripId);

    return {
      ...review,
      trip: trip
        ? {
            title: trip.title,
            price: trip.price
          }
        : null
    };
  });

  res.status(200).json({
    message: "User reviews fetched successfully",
    total: data.length,
    data
  });
};

const getUserExperiences = (req, res) => {
  const userId = parseInt(req.params.id);

  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  const userExperiences = experiences.filter(e => e.userId === userId);

  res.status(200).json({
    message: "User experiences fetched successfully",
    total: userExperiences.length,
    data: userExperiences
  });
};




module.exports = {
    getAllUsers,getUserById,
    addUser,updateUser,
    deleteUser,getUserPosts,
    getUserBookings,getUserReviews,
    getUserExperiences
};