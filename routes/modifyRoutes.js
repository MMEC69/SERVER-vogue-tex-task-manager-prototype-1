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
    modifyProject,
    addComment
} = require("../controllers/modifyController");

router.put("/modifyTheProject/:selectedProject", modifyProject);
router.put("/addComment/:projectName", addComment);

module.exports = router;