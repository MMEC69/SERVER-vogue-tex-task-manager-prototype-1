const path = require("path");
const {dateFormat1} = require(path.join(__dirname, "conversion"));

const CNPTemplateText = (msgDetails, comrades) => {
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

    comrades = comrades.toString();

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
        Who are assigned: ${comrades}
        Project Start Date: ${startDate}
        Project Due Date: ${dueDate}
        Project State: ${projectState}
        Thank You, Regards Vogue-Tex-Task-Management
        Here with attached files,
        `;
    return msg
}
// ====================================================
const CNPTemplateHTML = (msgDetails, comrades) => {
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

    comrades = comrades.toString();

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
        Who are assigned: ${comrades}<br>
        Project Start Date: ${startDate}<br>
        Project Due Date: ${dueDate}<br>
        Project State: ${projectState}<br>
        Thank You, Regards Vogue-Tex-Task-Management
        Here with attached files,</p>
        </body>
        </html>`;
    return msg
}


module.exports = {
    CNPTemplateText,
    CNPTemplateHTML
}