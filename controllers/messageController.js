const path = require("path");
const Message = require(path.join(__dirname, "..", "models", "message.js"));

// ===========================================================
const postMessage = async(req, res) =>{
    console.log("> postMessage initiated");
    const message = req.body;
    const newMesage = new Message(message);
    try {
        const savedMessage = await newMesage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        console.log("> postMessage ended");
        res.status(500).json(error);
    }
    console.log("> postMessage ended");
}
// ===========================================================
const getMessage = async (req, res) => {
    console.log("> getMessage initiated");
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
        console.log("> getMessage ended");
        res.status(500).json(error);
    }
    console.log("> getMessage ended");
}
// ===========================================================

module.exports = {
    postMessage,
    getMessage
};

