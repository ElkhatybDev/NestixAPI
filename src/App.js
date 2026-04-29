const express = require("express");
const cors = require("cors");

//resources li khedam elihoum
const usersRoutes = require("./routes/users.routes");
const postsRoutes = require("./routes/posts.routes");
const commentsRoutes = require("./routes/comments.routes");

//9adina app 
const app = express();

app.use(cors());
app.use(express.json());

//hada test dyal route 
app.get("/", (req, res) => {
    res.status(200).json({
        message: "NestixAPI is running "
    });
});

//kaneayto routes li kaynin 
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);

module.exports = app;