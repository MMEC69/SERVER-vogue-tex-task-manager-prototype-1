const path = require("path");
const Message = require(path.join(__dirname, "..", "models", "message.js"));

// ===========================================================
const postMessage = async(req, res) =>{
    console.log("> postConversation initiated");
    const message = req.body;
    const newMesage = new Message(message);
    try {
        const savedMessage = await newMesage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        console.log("> postConversation ended");
        res.status(500).json(error);
    }
    console.log("> postConversation ended");
}
// ===========================================================
const getMessage = async (req, res) => {
    console.log("> getConversation initiated");
    const {
        conversationId
    } = req.params;
    try {
        const messages = await Message.find({
            conversationId : conversationId
        });
        console.log(messages);
        res.status(200).json(messages);
    } catch (error) {
        console.log("> getConversation ended");
        res.status(500).json(error);
    }
    console.log("> getConversation ended");
}
// ===========================================================

module.exports = {
    postMessage,
    getMessage
};

