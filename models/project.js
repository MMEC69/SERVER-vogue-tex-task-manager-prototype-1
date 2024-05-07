const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
    projectOwner: Object,
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
    tasks: Array,
    comments: Array
});

const ProjectModel = mongoose.model("project", projectSchema);

module.exports = ProjectModel;