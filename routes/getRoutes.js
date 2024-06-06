const express = require("express");
const router = express.Router();
const cors = require("cors");
const path = require("path");
const originURL = process.env.originURL;
const { 
    getProfile,
    getProjects,
    getUsers
} = require(path.join(__dirname, "..", "controllers", "getController"));

//middleware
router.use(
    cors({
        credentials: true,
        origin: originURL
    })
);

router.get("/user", getProfile);
router.get("/projects", getProjects);
router.get("/users", getUsers);

module.exports = router;