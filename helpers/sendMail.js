const {initialDeco, processDeco} = require("./textDecorations");

const sendMail = async (transporter, mailOptions) => {
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