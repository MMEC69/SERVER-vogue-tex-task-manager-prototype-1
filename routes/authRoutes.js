const express = require("express");
const router = express.Router();
const cors = require("cors");
const path = require("path");
const originURL = process.env.originURL;
const { 
    registerUser, 
    loginUser,
    modifyUser
} = require(path.join(__dirname, "..", "controllers", "authController"));

//middleware
router.use(
    cors({
        credentials: true,
        origin: originURL
    })
);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/modify/user", modifyUser);

module.exports = router;