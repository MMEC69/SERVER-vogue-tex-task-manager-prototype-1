const path = require("path");
const {initialDeco, processDeco} = require(path.join(__dirname, "textDecorations"));

const sendMail = async (transporter, mailOptions) => {
    console.log(`${initialDeco}Mail Sending!${initialDeco}`);
    try {
        await transporter.sendMail(mailOptions);
        const result = `Email has been sent!${processDeco}`
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    sendMail
};