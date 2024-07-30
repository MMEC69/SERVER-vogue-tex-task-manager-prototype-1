const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {nodemailer} = require("nodemailer");
const schedule = require("node-schedule");
const {projectReminder} = require(path.join(__dirname, "helpers", "alerts.js"));

const app = express();
const PORT = process.env.PORT || 3000;
const {initialDeco, processDeco} = require(path.join(__dirname, "helpers", "textDecorations"));

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log(`${initialDeco}Database Connected!${initialDeco}`))
.catch((err) => console.log(`err: database Not Connected : ${err}`));

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

//Alert Functions
//time 00:01
const alert1 = schedule.scheduleJob("0 * * * *", () => {
    console.log("> alert1 initiated");
    projectReminder();
    console.log("> alert1 ended");
}); 

// miscellaneous
app.use("/", require(path.join(__dirname, "routes", "miscellaneousRoute")));

// auth
app.use("/", require(path.join(__dirname, "routes", "authRoutes")));

// get
app.use("/", require(path.join(__dirname, "routes", "getRoutes")));

// create
app.use("/", require(path.join(__dirname, "routes", "createRoutes")));

//modify
app.use("/", require(path.join(__dirname, "routes", "modifyRoutes")));

// delete
app.use("/", require(path.join(__dirname, "routes", "deleteRoutes")));

//fileUpload
app.use("/", require(path.join(__dirname, "routes", "uploadFilesRoutes")));

//fileDownload
app.use("/", require(path.join(__dirname, "routes", "downloadFileRoutes")));

//mail
app.use("/", require(path.join(__dirname, "routes", "sendMailRoutes")));

app.listen(PORT, () => {
    console.log(`${initialDeco}Server is running on ${PORT}${initialDeco}`);
});