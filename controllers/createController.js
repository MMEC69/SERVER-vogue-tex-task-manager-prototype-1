const Project = require("../models/project");

const createNewProject = async (req, res) => {
    try {
        const {
            projectOwner,
            projectName, 
            projectDescription, 
            departmentName, 
            startDate, 
            dueDate, 
            assignedTo, 
            projectState
        } = req.body;

        const{
            email
        } = projectOwner

        //Check if project owner is given
        if(!email){
            return res.json({
                error: "Project Owner is required!"
            });
        }

        //Check if project name is given
        if(!projectName){
            return res.json({
                error: "Project Name is required!"
            });
        }

        //check if project name is unique
        const exists = await Project.findOne({projectName});
        if(exists){
            return res.json({
                error: "Project name is alredy taken, provide a diffrent name!"
            });
        }

        //Check if project description is given
        if(!projectDescription){
            return res.json({
                error: "Project description can't be empty!"
            });
        }

        //Check if department name is given
        if(!departmentName){
            return res.json({
                error: "Department name is required!"
            });
        }

        //Check if startDate is given
        if(!startDate){
            return res.json({
                error: "start date is required!"
            });
        }

        //Check if dueDate is given
        if(!dueDate){
            return res.json({
                error: "due date is required!"
            });
        }

        //Check if users are assigned
        if(!assignedTo){
            return res.json({
                error: "Users need to be assigned!"
            });
        }

        //Check if project state is given
        if(!projectState){
            return res.json({
                error: "State is required!"
            });
        }

        const project = await Project.create({
            projectOwner,
            projectName,
            projectDescription,
            departmentName, 
            startDate, 
            dueDate, 
            assignedTo, 
            projectState
        });
        return res.json(project);
    } catch (error) {
        console.log("Error: " +error);
    }
}

const createNewTask = async (req, res) => {
    try {
        const {currentProject, tasks, user} = req.body;

        const {email} = user;
        const {currentProjectOwner, currentProjectName} = currentProject
        const projectName = currentProjectName;
        const newTasks = tasks
        
        const project = await Project.findOne({projectName});
        if(!project){
            console.log(currentProjectName)
            // console.log(tasks)
            return res.json({
                error: "Such project doesn't exist!"
            })
        }
        if(email != project.projectOwner.email){
            return res.json({
                error: "You are not allowed to add tasks!"
            });
        }
        console.log(project);

        const addedTasks = await project.updateOne({$push: {tasks: {$each: tasks}}});
        console.log(addedTasks);

        return res.json(addedTasks);
    } catch (error) {
        console.log("Error: " +error);
    }
}

module.exports = {
    createNewProject,
    createNewTask
};