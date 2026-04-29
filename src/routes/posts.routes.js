const express = require("express");
const router = express.Router();

const {
    getAllPosts,
    getPostById,
    addPost,
    updatePost,
    deletePost,
    getPostComments
} = require("../controllers/posts.controller");

//relation
router.get("/:id/comments", getPostComments);


router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", addPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;