const express = require("express");
const router = express.Router();
const cors = require("cors");
const path = require("path");
const originURL = process.env.originURL;
const {
    deleteProject,
    deleteTask
} = require(path.join(__dirname, "..", "controllers", "deleteController"));

//middleware
router.use(
    cors({
        credentials: true,
        origin: originURL
    })
);

router.put("/deleteTheProject/:projectToBeDeleted", deleteProject);
router.put("/deleteTheTask/:projectID", deleteTask);

module.exports = router;