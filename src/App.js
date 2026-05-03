const express = require("express");
const cors = require("cors");

//resources li khedam elihoum
const usersRoutes = require("./routes/users.routes");
const postsRoutes = require("./routes/posts.routes");
const commentsRoutes = require("./routes/comments.routes");
const destinationsRoutes = require("./routes/destinations.routes");
const tripsRoutes = require("./routes/trips.routes");
const bookingsRoutes = require("./routes/bookings.routes");
const reviewsRoutes = require("./routes/reviews.routes");
const experiencesRoutes = require("./routes/experiences.routes");
//Auth
const authRoutes = require("./routes/auth.routes");
//g-image
const imageRoutes = require("./routes/image.routes");

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
app.use("/destinations", destinationsRoutes);
app.use("/trips", tripsRoutes);
app.use("/bookings", bookingsRoutes);
app.use("/reviews", reviewsRoutes);
app.use("/experiences", experiencesRoutes);
//Auth
app.use("/auth", authRoutes);
//g-image
app.use("/image", imageRoutes);



module.exports = app;