const express = require("express");
const router = express.Router();
const cors = require("cors");
const originURL = process.env.originURL;

const { 
    registerUser, 
    loginUser
} = require("../controllers/authController");

//middleware
router.use(
    cors({
        credentials: true,
        origin: originURL
    })
);

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;