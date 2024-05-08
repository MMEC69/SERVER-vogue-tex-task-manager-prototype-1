const express = require("express");
const router = express.Router();
const cors = require("cors");

//middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:3001"
    })
);

const { 
    getProfile,
    getProjects,
    getUsers
} = require("../controllers/getController");

router.get("/profile", getProfile);
router.get("/getProjects", getProjects);
router.get("/getUsers", getUsers);

module.exports = router;