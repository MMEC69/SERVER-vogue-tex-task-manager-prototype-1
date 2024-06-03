//sendMailNewProject
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
    CNPMail
} = require("../controllers/sendMailController");

router.post("/sendMailNewProject", CNPMail);

module.exports = router;