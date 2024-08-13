const express = require("express");
const router = express.Router();
const cors = require("cors");
const path = require("path");
const originURL = process.env.originURL;
const { 
    addNewTicket,
    checkTicket
} = require(path.join(__dirname, "..", "controllers", "ticketController"));

//middleware
router.use(
    cors({
        credentials: true,
        origin: originURL
    })
);

router.post("/ticket/add", addNewTicket);
router.post("/ticket/check", checkTicket);

module.exports = router;