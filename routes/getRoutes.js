const express = require("express");
const router = express.Router();
const cors = require("cors");
const path = require("path");
const originURL = process.env.originURL;
const { 
    getProfile,
    getProjects,
    getUsers,
    getComments,
    getChatUsers,
    getProjectsByName
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
router.get("/projects/:projectName/:userId", getProjectsByName);
router.get("/users", getUsers);
router.get("/comments/:id", getComments);
router.get("/chatUsers/:userId", getChatUsers);

module.exports = router;