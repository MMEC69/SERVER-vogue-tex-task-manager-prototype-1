const path = require("path");
const {CNPTemplateText, CNPTemplateHTML} = require(path.join(__dirname, "..", "helpers", "mailTemplates"));
const {initialDeco, processDeco} = require(path.join(__dirname, "..", "helpers", "textDecorations"));
const {sendMail} = require(path.join(__dirname, "..", "helpers", "sendMail"));
const {transporter} = require(path.join(__dirname, "..", "helpers", "MailPara"));

const CNPMail = async (req, res) => {
    console.log("> CNPMail initiated");
    const {
        receivers,
        subject,
        msgDetails,
        attachments
    } = req.body;

    const msg = CNPTemplateText(msgDetails, receivers);
    const html = CNPTemplateHTML(msgDetails, receivers);

    const mailOptions = {
        from : {
            name : process.env.SENDING_ADDRESS_APP_NAME,
            address: process.env.SENDING_ADDRESS
        },
        to : receivers,
        subject: subject,
        text: msg,
        html: html
        // attachments: []
    }
    try {
        const result = await sendMail(transporter, mailOptions);
        console.log("> sendMailNewProject ended");
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        console.log("> sendMailNewProject ended");
        return res.status(200).json({
            error : error
        });
    }
}

module.exports = {
    CNPMail
};