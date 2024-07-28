const path = require("path");
const {dateFormat1} = require(path.join(__dirname, "conversion"));

const CNPTemplateText = (msgDetails, receivers) => {
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
    return msg
}
// ====================================================
const CNPTemplateHTML = (msgDetails, receivers) => {
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
    return msg
}
// ====================================================
const RPTemplateText = (msgDetails, receivers) => {
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
    return msg
}
// ====================================================
const RPTemplateHTML = (msgDetails, receivers) => {
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
    return msg
}
// ====================================================
const MPTemplateText = (msgDetails, receivers) => {
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
    return msg
}
// ====================================================
const MPTemplateHTML = (msgDetails, receivers) => {
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
    return msg
}
// ====================================================
const CSTemplateText = (msgDetails, receivers) => {
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
    return msg
}
// ====================================================
const CSTemplateHTML = (msgDetails, receivers) => {
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
    return msg
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
    CSTemplateHTML
}