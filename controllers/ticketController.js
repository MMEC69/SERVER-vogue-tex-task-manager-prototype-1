const path = require("path");
const { sendTicket } = require("../helpers/ticket");
const Ticket = require(path.join(__dirname, "..", "models", "ticket"));
const User = require(path.join(__dirname, "..", "models", "user"));
// ============================================================
const addNewTicket = async(req, res) => {
    console.log("> addNewTicket initiated");
    const {
        email
    } = req.body;
    const secretNumber = crypto.randomUUID();
    
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                msg: "Ticket-Failed"
            });
        }
        const newTicket = new Ticket({
            userId: user._id,
            ticketType: "Password Reset",
            secretNumber: secretNumber,
            state: "pending"
        });
        const savedTicket = await newTicket.save();
        sendTicket(user, savedTicket);
        return res.status(200).json({
            user: user,
            ticket: savedTicket,
            msg: "ticket-succeed"
        });
    } catch (error) {
        console.log(error);
        console.log("> addNewTicket ended");
    }
}
// ============================================================
const checkTicket = async (req, res) => {
    console.log("> checkTicket initiated");
    const {
        userId,
        ticket,
        receivedSecretNumber
    } = req.body;
    try {
        const requestingUser = await User.findOne({_id: userId});
        if(!requestingUser){
            console.log("> checkTicket ended");
            return res.status(400).json({
                msg: "There is no such user"
            });
        }
        
        const placedTicket = await Ticket.findOne({_id: ticket._id});
        if(!placedTicket){
            console.log("> checkTicket ended");
            return res.status(400).json({
                msg: "There is no such ticket"
            });
        }
        if(placedTicket.secretNumber !== receivedSecretNumber){
            console.log("> checkTicket ended");
            return res.status(400).json({
                msg: "Secret number fail to match"
            });
        }
        console.log("> checkTicket ended");
        return res.status(200).json({
            msg: "Secret number matches"
        });
    } catch (error) {
        console.log(error);
        console.log("> checkTicket ended");
    }
}
// ============================================================
module.exports = {
    addNewTicket,
    checkTicket
}