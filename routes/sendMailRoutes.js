//sendMailNewProject
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
    CNPMail
} = require("../controllers/sendMailController");

router.post("/sendMailNewProject", CNPMail);

module.exports = router;