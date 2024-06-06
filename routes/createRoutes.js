const express = require("express");
const router = express.Router();
const cors = require("cors");
const path = require("path");
const originURL = process.env.originURL;
const {
    createNewProject,
    createNewTask
} = require(path.join(__dirname, "..", "controllers", "createController"));

//middleware
router.use(
    cors({
        credentials: true,
        origin: originURL
    })
);

router.post("/createNewProject", createNewProject);
router.put("/createNewTask", createNewTask);

module.exports = router;