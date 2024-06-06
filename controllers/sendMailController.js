const path = require("path");
const {CNPTemplateText} = require(path.join(__dirname, "..", "helpers", "mailTemplates"));
const {initialDeco, processDeco} = require(path.join(__dirname, "..", "helpers", "textDecorations"));
const {sendMail} = require(path.join(__dirname, "..", "helpers", "sendMail"));
const {transporter} = require(path.join(__dirname, "..", "helpers", "MailPara"));

const CNPMail = async (req, res) => {
    console.log(`${initialDeco}CNPMail initalized${initialDeco}`);
    const {
        reciver,
        subject,
        msgDetails,
        attachments
    } = req.body;

    const {
        projectOwner,
        projectName,
        projectDescription,
        departmentName,
        startDate,
        dueDate,
        projectState,
        assignedTo
    } = msgDetails;

    const comrades = assignedTo.map((singleAssignedTo) => {
        return singleAssignedTo.email;
    });
    console.log(`Comrades${processDeco}`);
    console.log(comrades);
    console.log(processDeco);

    const msg = CNPTemplateText(msgDetails, comrades);
    
    const mailOptions = {
        from : {
            name : process.env.SENDING_ADDRESS_APP_NAME,
            address: process.env.SENDING_ADDRESS
        },
        to : comrades,
        subject: subject,
        text: msg,
        // html: '<b>Hello world<b/>'
        // attachments: []
    }
    try {
        const result = await sendMail(transporter, mailOptions);
        return res.status(200).json({
            message : result
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            error : error
        });
    }
}

module.exports = {
    CNPMail
};