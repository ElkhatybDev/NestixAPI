const posts = require("../data/posts.json");
const paginate = require("../utils/paginate");

//relation
const users = require("../data/users.json");
const comments = require("../data/comments.json");


// (CRUD)
const getAllPosts = (req, res) => {
    let result = posts;
    const { q, limit, skip, sort, order } = req.query;

    if (q) {
    const search = q.toLowerCase();

    result = result.filter(post =>
    post.title.toLowerCase().includes(search) ||
    post.body.toLowerCase().includes(search) ||
    post.tags?.some(tag => tag.toLowerCase().includes(search))
    );
}

    if (sort) {
    result = result.sort((postA, postB) => {
        const fieldA = String(postA[sort] || "").toLowerCase();
        const fieldB = String(postB[sort] || "").toLowerCase();

        if (order === "desc") return fieldA < fieldB ? 1 : -1;
        return fieldA > fieldB ? 1 : -1;
    });
    }

    const pagination = paginate(result, limit, skip);

    res.status(200).json({
    message: "Posts fetched successfully",
    ...pagination
    });
};

const getPostById = (req, res) => {
    const id = parseInt(req.params.id);

    const post = posts.find(post => post.id === id);    
    if (!post) {
    return res.status(404).json({
        message: "Post not found"
    });
    }

    res.status(200).json({
    message: "Post found",
    data: post
    });
};


const addPost = (req, res) => {
    const newPost = {
    id: posts.length + 1,
    ...req.body
    };

    posts.push(newPost);

    res.status(201).json({
    message: "Post added successfully",
    data: newPost
    });
};

const updatePost = (req, res) => {
    const id = parseInt(req.params.id);

    const postIndex = posts.findIndex(post => post.id === id);

    if (postIndex === -1) {
    return res.status(404).json({
        message: "Post not found"
    });
    }

    posts[postIndex] = {
    ...posts[postIndex],
    ...req.body
    };

    res.status(200).json({
    message: "Post updated successfully",
    data: posts[postIndex]
    });
};

const deletePost = (req, res) => {
    const id = parseInt(req.params.id);

    const postIndex = posts.findIndex(post => post.id === id);

    if (postIndex === -1) {
    return res.status(404).json({
        message: "Post not found"
    });
    }

    const deletedPost = posts.splice(postIndex, 1)[0];    
    res.status(200).json({
    message: "Post deleted successfully",
    data: deletedPost
    });
};


//relation mea comments

const getPostComments = (req, res) => {
    const postId = parseInt(req.params.id);

    const post = posts.find(post => post.id === postId);

    if (!post) {
    return res.status(404).json({
        message: "Post not found"
    });
    } 

    const postComments = comments.filter(comment => comment.postId === postId);

    const data = postComments.map(comment => {
        const user = users.find(user => user.id === comment.userId);

    return {
    ...comment,
    user: user
    ?  {
            firstName: user.firstName,
            lastName: user.lastName
        }
    : null
    };
});

    res.status(200).json({
    message: "Post comments fetched successfully",
    total: data.length,
    data
    });
};






module.exports = {
    getAllPosts,
    getPostById,
    addPost,
    updatePost,
    deletePost,
    getPostComments
};