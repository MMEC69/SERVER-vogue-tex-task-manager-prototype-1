const mongoose = require("mongoose");
const { Schema } = mongoose;

const ticketSchema = new Schema({
    userId: String,
    ticketType: String,
    secretNumber:String,
    state: String,
},
{ timestamps: true });

const TicketModel = mongoose.model("ticket", ticketSchema);

module.exports = TicketModel;