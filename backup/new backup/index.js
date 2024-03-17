const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database Connected!"))
.catch((err) => console.log("Database Not Connected : ", err));

//middleware
app.use(express.json);

app.use("/", require("./routes/authRoutes"));
app.use("/register", require("./routes/authRoutes"));




app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});