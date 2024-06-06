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
    createNewProject,
    createNewTask
} = require("../controllers/createController");

router.post("/createNewProject", createNewProject);
router.put("/createNewTask", createNewTask);

module.exports = router;