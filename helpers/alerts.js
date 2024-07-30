const path = require("path");
const { sendMail } = require("./sendMail");
const { userEmailFilter } = require("./conversion");
const Project = require(path.join(__dirname, "..", "models", "project"));
const {states} = require(path.join(__dirname, "..", "metaData", "metaData.js"));
const {dayCounter} = require(path.join(__dirname, "dateFunctions.js"));
const {transporter} = require(path.join(__dirname, "MailPara.js"));
const {SMATemplateText, SMATemplateHTML} = require(path.join(__dirname, "mailTemplates.js"));
const {changeProjectState} = require(path.join(__dirname, "seperateCRUD.js"));
const {alertPeriod} = require(path.join(__dirname, "..", "metaData", "metaData.js"));

const {
    oneMonth,
    twoWeeks,
    oneWeek,
    threeDays,
    oneDay,
    now,
}= alertPeriod;
// ==================================================
const projectReminder = async () => {
    console.log("> projectReminder initiated");
    try {
        const projectSet = await Project.find();
        if(!projectSet){
            return "There are no projects to send alerts"
        }
        projectSet?.map((singleProject) => {
            sendAlert(singleProject);
        });
        console.log("> projectReminder Ended");
        return "Alerts has send Successfully";
    } catch (error) {
        console.log("> projectReminder Ended");
        return error;
    }
}
// ==================================================
const sendAlert = async (singleProject) => {
    const today = new Date();
    const {
        _id,
        projectState,
        startDate,
        dueDate,
        assignedTo,
        projectName
    } = singleProject;
    const projectID = _id;
    switch (projectState) {
        case states[0].name:
            RespondPerDates(startDate, dueDate, assignedTo, projectName, projectState, projectID);
            break;
        // case states[3].name:
        //     RespondPerDates(startDate, dueDate, assignedTo, projectName, projectState, projectID);
        default:
            break;
    }
}
// ==================================================
const RespondPerDates = async (startDate, endDate, assignedTo, projectName, prevState, projectID) => {
    console.log("> RespondPerDates initiated");
    const DifferenceInDays = dayCounter(startDate, endDate);
    let postState = "";
    let receivers = [];
    let msgDetails = {};
    let alertType = "";

    switch (DifferenceInDays) {
        case now:
            postState = states[1].name;
            changeProjectState(projectID, postState);
            msgDetails = {
                projectName: projectName,
                prevState: prevState,
                postState: postState,
                remainingTime: DifferenceInDays
            }
            alertType = 0;
            receivers = await userEmailFilter(assignedTo);
            sendMailAlerts(receivers, msgDetails, alertType);
            break;
        case oneDay:
            msgDetails = {
                projectName: projectName,
                prevState: prevState,
                postState: prevState,
                remainingTime: DifferenceInDays
            }
            alertType = 1;
            receivers = await userEmailFilter(assignedTo);
            sendMailAlerts(receivers, msgDetails, alertType);
            break;
        case threeDays:
            msgDetails = {
                projectName: projectName,
                prevState: prevState,
                postState: prevState,
                remainingTime: DifferenceInDays
            }
            alertType = 2;
            receivers = await userEmailFilter(assignedTo);
            sendMailAlerts(receivers, msgDetails, alertType);
            break;
        case oneWeek:
            msgDetails = {
                projectName: projectName,
                prevState: prevState,
                postState: prevState,
                remainingTime: DifferenceInDays
            }
            alertType = 3;
            receivers = await userEmailFilter(assignedTo);
            sendMailAlerts(receivers, msgDetails, alertType);
            break;
        case twoWeeks:
            msgDetails = {
                projectName: projectName,
                prevState: prevState,
                postState: prevState,
                remainingTime: DifferenceInDays
            }
            alertType = 4;
            receivers = await userEmailFilter(assignedTo);
            sendMailAlerts(receivers, msgDetails, alertType);
            break;
        case oneMonth:
            msgDetails = {
                projectName: projectName,
                prevState: prevState,
                postState: prevState,
                remainingTime: DifferenceInDays
            }
            alertType = 5;
            receivers = await userEmailFilter(assignedTo);
            sendMailAlerts(receivers, msgDetails, alertType);
            break;
        default:
            break;
    }
    

}
// ==================================================
const sendMailAlerts = async (receivers, msgDetails, alertType) => {
    console.log("> sendMailAlerts initiated");
    const {
        projectName
    } = msgDetails;
    const subject = mailSubjectChooser(projectName, alertType);
    const msg = SMATemplateText(msgDetails, alertType);
    const html = SMATemplateHTML(msgDetails, alertType);
    
    const mailOptions = {
        from: {
            name : process.env.SENDING_ADDRESS_APP_NAME,
            address: process.env.SENDING_ADDRESS
        },
        to: receivers,
        subject: subject,
        text: msg,
        html: html
    }
    try {
        const result = await sendMail(transporter, mailOptions);
        console.log(result);
        console.log("> sendMailAlerts ended");
        return "Mail sent";
    } catch (error) {
        console.log(error);
        console.log("> sendMailAlerts ended");
        return "Mail didn't send";
    }
}
// ==================================================
const mailSubjectChooser = (projectName, alertType) => {
    let subject = "ALERT: PLEASE CHECK";
    switch (alertType) {
        case 0:
            subject = `${projectName} IS DUE`;
            break;
        case 1:
            subject = `${projectName} REMINDER`;
            break;
        case 2:
            subject = `${projectName} REMINDER`;
            break;
        case 3:
            subject = `${projectName} REMINDER`;
            break;
        case 4:
            subject = `${projectName} REMINDER`;
            break;
        case 5:
            subject = `${projectName} REMINDER`;
            break;
        default:
            break;
    }
    return subject;
}
// ==================================================
module.exports = {
    projectReminder
};

// What should i do ? i need to add function to each
// case and each function should do the according to
// algorithm and 