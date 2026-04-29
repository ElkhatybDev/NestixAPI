const express = require("express");
const router = express.Router();

const {
    getAllComments,
    getCommentById,
    addComment,
    updateComment,
    deleteComment
} = require("../controllers/comments.controller");

//relation
router.get("/", getAllComments);
router.get("/:id", getCommentById);


router.post("/", addComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;