const path = require("path");
const {dateFormat1} = require(path.join(__dirname, "conversion"));

const CNPTemplateText = (msgDetails, receivers) => {
    console.log("> CNPTemplateText initiated");
    let today = new Date();
    today = dateFormat1(today);

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

    receivers = receivers.toString();

    const msg = `
        Dear sir/madam,
        The project "${projectName}" has been created by ${projectOwner.fullName} on ${today}
        this project has been scheduled to start on ${startDate}
        and the due date is ${dueDate}. You have been assigned to this
        project as a "User". Further details are mentioned below.
        Department Name: ${departmentName}
        Project Owner/creator : ${projectOwner.projectName}
        Project Name : ${projectName}
        Project Description: ${projectDescription}
        Who are assigned: ${receivers}
        Project Start Date: ${startDate}
        Project Due Date: ${dueDate}
        Project State: ${projectState}
        Thank You, Regards Vogue-Tex-Task-Management
        Here with attached files,
        `;
    console.log("> CNPTemplateText ended");
    return msg;
}
// ====================================================
const CNPTemplateHTML = (msgDetails, receivers) => {
    console.log("> CNPTemplateHTML initiated");
    let today = new Date();
    today = dateFormat1(today);

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

    receivers = receivers.toString();

    const msg = `
        <html>
        <body>
        <b>Dear sir/madam,</b>
        <p>The project "${projectName}" has been created by ${projectOwner.fullName} on ${today}
        this project has been scheduled to start on ${startDate}
        and the due date is ${dueDate}. You have been assigned to this
        project as a "User". Further details are mentioned below.<br>
        Department Name: ${departmentName}<br>
        Project Owner/creator : ${projectOwner.projectName}<br>
        Project Name : ${projectName}<br>
        Project Description: ${projectDescription}<br>
        Who are assigned: ${receivers}<br>
        Project Start Date: ${startDate}<br>
        Project Due Date: ${dueDate}<br>
        Project State: ${projectState}<br>
        Thank You, Regards Vogue-Tex-Task-Management
        Here with attached files,</p>
        </body>
        </html>`;
    console.log("> CNPTemplateHTML ended");
    return msg;
}
// ====================================================
const RPTemplateText = (msgDetails, receivers) => {
    console.log("> RPTemplateText initiated");
    let today = new Date();
    today = dateFormat1(today);

    const {
        projectName,
        projectDeleterEmail
    } = msgDetails;

    receivers = receivers.toString();

    const msg = `
        Dear sir/madam,
        The project "${projectName}" has been deleted by ${projectDeleterEmail} on ${today}.
        Thank You, Regards Vogue-Tex-Task-Management
        `;
    console.log("> RPTemplateText ended");
    return msg;
}
// ====================================================
const RPTemplateHTML = (msgDetails, receivers) => {
    console.log("> RPTemplateHTML initiated");
    let today = new Date();
    today = dateFormat1(today);

    const {
        projectName,
        projectDeleterEmail
    } = msgDetails;

    receivers = receivers.toString();

    const msg = `
        <html>
        <body>
        <b>Dear sir/madam,</b>
        <p>The project "${projectName}" has been deleted by ${projectDeleterEmail} on ${today}.<br>
        Thank You, Regards Vogue-Tex-Task-Management</p>
        </body>
        </html>`;
    console.log("> RPTemplateHTML ended");
    return msg;
}
// ====================================================
const MPTemplateText = (msgDetails, receivers) => {
    console.log("> MPTemplateText initiated");
    let today = new Date();
    today = dateFormat1(today);

    const {
        projectName,
        projectModifierEmail
    } = msgDetails;

    receivers = receivers.toString();

    const msg = `
        Dear sir/madam,
        The project "${projectName}" has been modified by ${projectModifierEmail} on ${today}.
        Thank You, Regards Vogue-Tex-Task-Management
        `;
    console.log("> MPTemplateText ended");
    return msg;
}
// ====================================================
const MPTemplateHTML = (msgDetails, receivers) => {
    console.log("> MPTemplateHTML initiated");
    let today = new Date();
    today = dateFormat1(today);

    const {
        projectName,
        projectModifierEmail
    } = msgDetails;

    receivers = receivers.toString();

    const msg = `
        <html>
        <body>
        <b>Dear sir/madam,</b>
        <p>The project "${projectName}" has been deleted by ${projectModifierEmail} on ${today}.<br>
        Thank You, Regards Vogue-Tex-Task-Management</p>
        </body>
        </html>`;
    console.log("> MPTemplateHTML ended");
    return msg;
}
// ====================================================
const CSTemplateText = (msgDetails, receivers) => {
    console.log("> CSTemplateText initiated");
    let today = new Date();
    today = dateFormat1(today);

    const {
        projectName,
        projectStateChangerEmail,
        prevState,
        postState
    } = msgDetails;

    receivers = receivers.toString();

    const msg = `
        Dear sir/madam,
        The project "${projectName}" state has been changed from 
        ${prevState} to ${postState} by ${projectStateChangerEmail} on ${today}.
        Thank You, Regards Vogue-Tex-Task-Management
        `;
    console.log("> CSTemplateText ended");
    return msg;
}
// ====================================================
const CSTemplateHTML = (msgDetails, receivers) => {
    console.log("> CSTemplateHTML initiated");
    let today = new Date();
    today = dateFormat1(today);

    const {
        projectName,
        projectStateChangerEmail,
        prevState,
        postState
    } = msgDetails;

    receivers = receivers.toString();

    const msg = `
        <html>
        <body>
        <b>Dear sir/madam,</b>
        <p>The project "${projectName}" state has been changed from 
        ${prevState} to ${postState} by ${projectStateChangerEmail} on ${today}.
        Thank You, Regards Vogue-Tex-Task-Management</p>
        </body>
        </html>`;
    console.log("> CSTemplateHTML ended");
    return msg
}
// ====================================================
const SMATemplateText = (msgDetails, alertType) => {
    console.log("> SMATemplateText initiated");
    let today = new Date();
    let msg = "";
    today = dateFormat1(today);

    const {
        projectName,
        prevState,
        postState,
        remainingTime
    } = msgDetails;

    switch (alertType) {
        case 0:
            msg = `
                Dear sir/madam,
                The project "${projectName}" is due and it's state has been changed from 
                ${prevState} to ${postState} on ${today}.
                Thank You, Regards Vogue-Tex-Task-Management</p>
                `;
            break;
        case 1:
            msg = `
                Dear sir/madam,
                The project "${projectName}" have only ${remainingTime} remaining days in time on ${today}.
                Thank You, Regards Vogue-Tex-Task-Management</p>
                `;
            break;
        case 2:
            msg = `
                Dear sir/madam,
                The project "${projectName}" have only ${remainingTime} remaining days in time on ${today}.
                Thank You, Regards Vogue-Tex-Task-Management</p>
                `;
            break;
        case 3:
            msg = `
                Dear sir/madam,
                The project "${projectName}" have only ${remainingTime} remaining days in time on ${today}.
                Thank You, Regards Vogue-Tex-Task-Management</p>
                `;
            break;
        case 4:
            msg = `
                Dear sir/madam,
                The project "${projectName}" have only ${remainingTime} remaining days in time on ${today}.
                Thank You, Regards Vogue-Tex-Task-Management</p>
                `;
            break;
        case 5:
            msg = `
                Dear sir/madam,
                The project "${projectName}" have only ${remainingTime} remaining days in time on ${today}.
                Thank You, Regards Vogue-Tex-Task-Management</p>
                `;
            break;
        default:
            break;
    }
    console.log("> SMATemplateText ended");
    return msg;
}
// ====================================================
const SMATemplateHTML = (msgDetails, alertType) => {
    console.log("> SMATemplateHTML initiated");
    let today = new Date();
    let msg = "";
    today = dateFormat1(today);
    const {
        projectName,
        prevState,
        postState,
        remainingTime
    } = msgDetails;

    switch (alertType) {
        case 0:
            msg = `
                <html>
                <body>
                <b>Dear sir/madam,</b>
                <p>The project "${projectName}" is due and it's state has been changed from 
                ${prevState} to ${postState} on ${today}.
                Thank You, Regards Vogue-Tex-Task-Management</p>
                </body>
                </html>`;
            break;
        case 1:
            msg = `
                <html>
                <body>
                <b>Dear sir/madam,</b>
                <p>The project "${projectName}" have only ${remainingTime} remaining days in time 
                on ${today}.
                Thank You, Regards Vogue-Tex-Task-Management</p>
                </body>
                </html>`;
            break;
        case 2:
            msg = `
                <html>
                <body>
                <b>Dear sir/madam,</b>
                <p>The project "${projectName}" have only ${remainingTime} remaining days in time 
                on ${today}.
                Thank You, Regards Vogue-Tex-Task-Management</p>
                </body>
                </html>`;
            break;
        case 3:
            msg = `
                <html>
                <body>
                <b>Dear sir/madam,</b>
                <p>The project "${projectName}" have only ${remainingTime} remaining days in time 
                on ${today}.
                Thank You, Regards Vogue-Tex-Task-Management</p>
                </body>
                </html>`;
            break;
        case 4:
            msg = `
                <html>
                <body>
                <b>Dear sir/madam,</b>
                <p>The project "${projectName}" have only ${remainingTime} remaining days in time 
                on ${today}.
                Thank You, Regards Vogue-Tex-Task-Management</p>
                </body>
                </html>`;
            break;
        case 5:
            msg = `
                <html>
                <body>
                <b>Dear sir/madam,</b>
                <p>The project "${projectName}" have only ${remainingTime} remaining days in time 
                on ${today}.
                Thank You, Regards Vogue-Tex-Task-Management</p>
                </body>
                </html>`;
            break;
        default:
            break;
    }
    console.log("> SMATemplateHTML ended");
    return msg;
}
// ====================================================
const ticketMailTemplateText = (ticket) => {
    console.log("> ticketMailTemplateText initiated");
    let today = new Date();
    today = dateFormat1(today);

    const {
        _id,
        secretNumber,
        ticketType
    } = ticket;

    const msg = `
        Dear sir/madam,
        A ticket for ${ticketType} has been placed on ${today}, the ticket id is ${_id}
        and the secret number is ${secretNumber}.
        Thank You, Regards Vogue-Tex-Task-Management
        `;
    console.log("> ticketMailTemplateText ended");
    return msg;
}
// ====================================================
const ticketMailTemplateHTML = (ticket) => {
    console.log("> ticketMailTemplateHTML initiated");
    let today = new Date();
    today = dateFormat1(today);

    const {
        _id,
        secretNumber,
        ticketType
    } = ticket;

    const msg = `
        <html>
        <body>
        <b>Dear sir/madam,</b>
        <p>Dear sir/madam,
        A ticket for ${ticketType} has been placed on ${today}, the ticket id is ${_id}
        and the secret number is <b>${secretNumber}</b>.
        Thank You, Regards Vogue-Tex-Task-Management
        </body>
        </html>`;
    console.log("> ticketMailTemplateHTML ended");
    return msg;
}
// ====================================================
const updateTicketMailTemplateText = (ticket) => {
    console.log("> updateTicketMailTemplateText initiated");
    let today = new Date();
    today = dateFormat1(today);

    const {
        _id,
        secretNumber,
        ticketType,
        state
    } = ticket;

    const msg = `
        Dear sir/madam,
        A ticket for ${ticketType} has been placed completed.
        Thank You, Regards Vogue-Tex-Task-Management
        `;
    console.log("> updateTicketMailTemplateText ended");
    return msg;
}
// ====================================================
const updateTicketMailTemplateHTML = (ticket) => {
    console.log("> updateTicketMailTemplateHTML initiated");
    let today = new Date();
    today = dateFormat1(today);

    const {
        _id,
        secretNumber,
        ticketType,
        state
    } = ticket;

    const msg = `
        <html>
        <body>
        <b>Dear sir/madam,</b>
        <p>Dear sir/madam,
        A ticket for ${ticketType} has been placed completed.
        Thank You, Regards Vogue-Tex-Task-Management
        </body>
        </html>`;
    console.log("> ticketMailTemplateHTML ended");
    return msg;
}
// ====================================================

module.exports = {
    CNPTemplateText,
    CNPTemplateHTML,
    RPTemplateText,
    RPTemplateHTML,
    MPTemplateText,
    MPTemplateHTML,
    CSTemplateText,
    CSTemplateHTML,
    SMATemplateText,
    SMATemplateHTML,
    ticketMailTemplateText,
    ticketMailTemplateHTML,
    updateTicketMailTemplateText,
    updateTicketMailTemplateHTML
}