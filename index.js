const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {nodemailer} = require("nodemailer");

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

// miscellaneous
app.use("/", require("./routes/miscellaneousRoute"));

// auth
app.use("/", require("./routes/authRoutes"));

// get
app.use("/", require("./routes/getRoutes"));

// create
app.use("/", require("./routes/createRoutes"));

//modify
app.use("/", require("./routes/modifyRoutes"));

// delete
app.use("/", require("./routes/deleteRoutes"));

//fileUpload
app.use("/", require("./routes/uploadFilesRoutes"));

//fileDownload
app.use("/", require("./routes/downloadFileRoutes"));

//mail
app.use("/", require("./routes/sendMailRoutes"));

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});