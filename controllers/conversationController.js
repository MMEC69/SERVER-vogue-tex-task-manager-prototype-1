const path = require("path");
const Conversation = require(path.join(__dirname, "..", "models", "conversation.js"));

// ===========================================================
const postConversation = async(req, res) =>{
    console.log("> postConversation initiated");
    const {
        senderId,
        receiverId
    } = req.body;
    const newConversation = new Conversation({
        members: [senderId, receiverId]
    });
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        console.log("> postConversation ended");
        res.status(500).json(error);
    }
    console.log("> postConversation ended");
}
// ===========================================================
const getConversation = async (req, res) => {
    console.log("> getConversation initiated");
    const {
        userId
    } = req.params;
    try {
        const conversation = await Conversation.find({
            members : {$in : [userId]}
        });
        res.status(200).json(conversation);
    } catch (error) {
        console.log("> getConversation ended");
        res.status(500).json(error);
    }
    console.log("> getConversation ended");
}
// ===========================================================

module.exports = {
    postConversation,
    getConversation
};