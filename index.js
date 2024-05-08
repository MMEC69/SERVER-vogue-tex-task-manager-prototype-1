const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3000;

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database Connected!"))
.catch((err) => console.log("Database Not Connected : ", err));

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

app.use("/", require("./routes/authRoutes"));
app.use("/register", require("./routes/authRoutes"));
app.use("/login", require("./routes/authRoutes"));
app.use("/profile", require("./routes/authRoutes"));
app.use("/createNewProject", require("./routes/authRoutes"));
app.use("/createNewTask", require("./routes/authRoutes"));
app.use("/getProjects", require("./routes/authRoutes"));
app.use("/getUsers", require("./routes/authRoutes"));
app.use("/modifyTheProject/:currentProjectName", require("./routes/authRoutes"));
app.use("/deleteTheProject/:projectToBeDeleted", require("./routes/authRoutes"));
app.use("/addComment/:projectName", require("./routes/authRoutes"));


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});