const express = require("express");
const cors = require("cors");

const usersRoutes = require("./routes/users.routes");

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

module.exports = app;