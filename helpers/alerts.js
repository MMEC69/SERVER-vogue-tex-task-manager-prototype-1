const path = require("path");
const Project = require(path.join(__dirname, "..", "models", "project"));
const {states} = require(path.join(__dirname, "..", "metaData", "metaData.js"));
const {dayCounter} = require(path.join(__dirname, "dateFunctions.js"));

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
        projectState,
        startDate,
        dueDate
    } = singleProject;
    switch (projectState) {
        case states[0].name:
            
            break;
    
        default:
            break;
    }
}
// ==================================================
const RespondPerDates = () => {
    // if()
}
// ==================================================

module.exports = {
    projectReminder
};

// What should i do ? i need to add function to each
// case and each function should do the according to
// algorithm and 