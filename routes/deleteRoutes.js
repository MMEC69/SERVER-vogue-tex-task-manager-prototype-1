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
    deleteProject
} = require("../controllers/deleteController");

router.put("/deleteTheProject/:projectToBeDeleted", deleteProject);

module.exports = router;