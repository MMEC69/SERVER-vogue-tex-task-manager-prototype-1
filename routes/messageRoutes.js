const express = require("express");
const router = express.Router();
const path = require("path");
const Message = require(path.join(__dirname, "..", "models", "message.js"));
const cors = require("cors");
const originURL = process.env.originURL;

const {
    postMessage,
    getMessage
} = require(path.join(__dirname, "..", "controllers", "messageController.js"));

//middleware
router.use(
    cors({
        credentials: true,
        origin: originURL
    })
);

router.post("/postMessage", postMessage);
router.get("/getMessage/:conversationId", getMessage);

module.exports = router;