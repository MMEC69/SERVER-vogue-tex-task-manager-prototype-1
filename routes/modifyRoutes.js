const express = require("express");
const router = express.Router();
const cors = require("cors");
const path = require("path");
const originURL = process.env.originURL;
const {
    modifyProject,
    addComment,
    modifyTaskState,
    taskModify,
    modifyProjectByName
} = require(path.join(__dirname, "..", "controllers", "modifyController"));

//middleware
router.use(
    cors({
        credentials: true,
        origin: originURL
    })
);

router.put("/modifyTheProject/:selectedProject", modifyProject);
router.put("/addComment/:projectID", addComment);
router.put("/modifyTheTaskState/:selectedProject", modifyTaskState);
router.put("/modifyTask/:selectedProject", taskModify);
router.put("/modifyProjectByName/:selectedProject", modifyProjectByName);

module.exports = router;