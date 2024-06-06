const express = require("express");
const router = express.Router();
const cors = require("cors");
const originURL = process.env.originURL;

//middleware
router.use(
    cors({
        credentials: true,
        origin: originURL
    })
);

const { 
    getProfile,
    getProjects,
    getUsers
} = require("../controllers/getController");

router.get("/user", getProfile);
router.get("/projects", getProjects);
router.get("/users", getUsers);

module.exports = router;