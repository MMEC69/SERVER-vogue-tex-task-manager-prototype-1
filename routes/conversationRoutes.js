const express = require("express");
const router = express.Router();
const path = require("path");
const Conversation = require(path.join(__dirname, "..", "models", "conversation.js"));
const cors = require("cors");
const originURL = process.env.originURL;

const {
    postConversation,
    getConversation
} = require(path.join(__dirname, "..", "controllers", "conversationController.js"));

//middleware
router.use(
    cors({
        credentials: true,
        origin: originURL
    })
);

router.post("/postConversation", postConversation);
router.get("/getConversation/:userId", getConversation);

module.exports = router;