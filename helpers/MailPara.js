const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: process.env.SENDING_ADDRESS_SERVICE,
    host : process.env.SENDING_ADDRESS_HOST,
    port : process.env.SENDING_ADDRESS_PORT,
    secure : process.env.SENDING_ADDRESS_SECURE,
    auth:  {
        user: process.env.SENDING_ADDRESS,
        pass: process.env.SENDING_ADDRESS_PASSWORD
    }
});


module.exports = {
    transporter
};
