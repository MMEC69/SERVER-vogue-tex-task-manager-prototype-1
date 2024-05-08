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
    createNewProject,
    createNewTask
} = require("../controllers/createController");

router.post("/createNewProject", createNewProject);
router.put("/createNewTask", createNewTask);

module.exports = router;