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
    deleteProject,
    deleteTask
} = require("../controllers/deleteController");

router.put("/deleteTheProject/:projectToBeDeleted", deleteProject);
router.put("/deleteTheTask/:projectName", deleteTask);

module.exports = router;