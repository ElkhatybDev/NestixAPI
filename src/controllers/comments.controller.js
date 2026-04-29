const comments = require("../data/comments.json");
const paginate = require("../utils/paginate");



const getAllComments = (req, res) => {
    let result = comments;

    const { q, limit, skip, sort, order } = req.query;

    if (q) {
    const search = q.toLowerCase();

    result = result.filter(comment =>
        comment.body.toLowerCase().includes(search) ||
        comment.userId.toString().includes(search) ||
        comment.postId.toString().includes(search)
    );
    }

    if (sort) {
    result = result.sort((commentA, commentB) => {
        const fieldA = String(commentA[sort] || "").toLowerCase();
        const fieldB = String(commentB[sort] || "").toLowerCase();

        if (order === "desc") return fieldA < fieldB ? 1 : -1;
        return fieldA > fieldB ? 1 : -1;
    });
    }

    const pagination = paginate(result, limit, skip);

    res.status(200).json({
    message: "Comments fetched successfully",
    ...pagination
    });
};

const getCommentById = (req, res) => {
    const id = parseInt(req.params.id);

    const comment = comments.find(comment => comment.id === id);

  if (!comment) {
    return res.status(404).json({
        message: "Comment not found"
    });
    }

    res.status(200).json({
    message: "Comment found",
    data: comment
    });
};

const addComment = (req, res) => {
    const newComment = {
    id: comments.length + 1,
    ...req.body
    };

    comments.push(newComment);

    res.status(201).json({
    message: "Comment added successfully",
    data: newComment
    });
};

const updateComment = (req, res) => {
    const id = parseInt(req.params.id);

    const commentIndex = comments.findIndex(comment => comment.id === id);

    if (commentIndex === -1) {
    return res.status(404).json({
        message: "Comment not found"
    });
    }

    comments[commentIndex] = {
    ...comments[commentIndex],
    ...req.body
    };

    res.status(200).json({
    message: "Comment updated successfully",
    data: comments[commentIndex]
    });
};

const deleteComment = (req, res) => {
    const id = parseInt(req.params.id);

    const commentIndex = comments.findIndex(comment => comment.id === id);

    if (commentIndex === -1) {
    return res.status(404).json({
        message: "Comment not found"
    });
    }

    const deletedComment = comments.splice(commentIndex, 1)[0];

    res.status(200).json({
    message: "Comment deleted successfully",
    data: deletedComment
    });
};

module.exports = {
    getAllComments,
    getCommentById,
    addComment,
    updateComment,
    deleteComment
};