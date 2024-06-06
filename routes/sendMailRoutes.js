//sendMailNewProject
const express = require("express");
const router = express.Router();
const cors = require("cors");
const path = require("path");
const originURL = process.env.originURL;
const { 
    CNPMail
} = require(path.join(__dirname, "..", "controllers", "sendMailController"));

//middleware
router.use(
    cors({
        credentials: true,
        origin: originURL
    })
);

router.post("/sendMailNewProject", CNPMail);

module.exports = router;