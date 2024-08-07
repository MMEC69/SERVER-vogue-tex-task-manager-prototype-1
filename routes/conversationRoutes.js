const express = require("express");
const router = express.Router();
const path = require("path");
const Conversation = require(path.join(__dirname, "..", "models", "conversation.js"));
const cors = require("cors");
const originURL = process.env.originURL;

const {
    postConversation,
    getConversation,
    getConversationBy2Ids
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
router.get("/getConversation/:firstUserId/:secondUserId", getConversationBy2Ids);

module.exports = router;