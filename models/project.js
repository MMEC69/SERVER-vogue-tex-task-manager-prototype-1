const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
    projectOwner: String,
    projectName: {
        type: String,
        unique: true
    },
    projectDescription: String,
    departmentName: String,
    startDate: String,
    dueDate: String,
    assignedTo: Array,
    projectState: String,
    attachments:Array,
    tasks: [{
        newTaskName:String,
        newTaskDescription:String,
        newTaskStartDate:String,
        newTaskDueDate:String,
        newTaskAssignedTo:Object,
        assigner:Object,
        assignedProject:String,
        taskState:String
    }],
    comments: Array
});

const ProjectModel = mongoose.model("project", projectSchema);

module.exports = ProjectModel;