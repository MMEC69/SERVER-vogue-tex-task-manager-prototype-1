const path = require("path");
const { sendMail } = require("./sendMail");
const {transporter} = require(path.join(__dirname, "MailPara.js"));
const {ticketMailTemplateText, ticketMailTemplateHTML} = require(path.join(__dirname, "mailTemplates.js"));

// ==================================================
const sendTicket = async (user, ticket) => {
    console.log("> sendTicket initiated");
    const subject = "Ticket Placed"
    const msg = ticketMailTemplateText(ticket);
    const html = ticketMailTemplateHTML(ticket);
    const mailOptions = {
        from: {
            name : process.env.SENDING_ADDRESS_APP_NAME,
            address: process.env.SENDING_ADDRESS
        },
        to: user.email,
        subject: subject,
        text: msg,
        html: html
    }
    try {
        const result = await sendMail(transporter, mailOptions);
        console.log(result);
        console.log("> ticket ended");
        return "Mail sent";
    } catch (error) {
        console.log(error);
        console.log("> ticket ended");
        return "Mail didn't send";
    }
}
// ==================================================
const updateTicket = async (user, ticket) => {
    console.log("> updateTicket initiated");
    const subject = "Ticket Placed"
    const msg = ticketMailTemplateText(ticket);
    const html = ticketMailTemplateHTML(ticket);
    const mailOptions = {
        from: {
            name : process.env.SENDING_ADDRESS_APP_NAME,
            address: process.env.SENDING_ADDRESS
        },
        to: user.email,
        subject: subject,
        text: msg,
        html: html
    }
    try {
        const result = await sendMail(transporter, mailOptions);
        console.log(result);
        console.log("> updateTicket ended");
        return "Mail sent";
    } catch (error) {
        console.log(error);
        console.log("> updateTicket ended");
        return "Mail didn't send";
    }
}
// ==================================================
module.exports = {
    sendTicket,
    updateTicket
};
