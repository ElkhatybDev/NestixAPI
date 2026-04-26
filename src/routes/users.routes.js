const express = require("express");
const router = express.Router();

//kaneayto function li staemlna fi controller 
const {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    getUserPosts,
    getUserBookings
} = require("../controllers/users.controller");

//relation 
router.get("/:id/posts", getUserPosts);
router.get("/:id/bookings", getUserBookings);


// route et param (CRUD)
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);


//kankharjo router bach nestaemloha again.
module.exports = router;

