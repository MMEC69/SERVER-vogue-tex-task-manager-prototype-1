const path = require("path");
const Project = require(path.join(__dirname, "..", "models", "project"));

const createNewProject = async (req, res) => {
    console.log("> createNewProject initiated");
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

        if(!projectOwner){
            console.log("> createNewProject ended");
            return res.status(400).json({
                error: "Project Owner is required"
            });
        }
        if(projectName){
            const exists = await Project.findOne({projectName});
            if(exists){
                console.log("> createNewProject ended");
                return res.status(400).json({
                    error: "Provide a unique project name"
                });
            }
        }else{
            console.log("> createNewProject ended");
            return res.status(400).json({
                error: "Project name is required"
            });
        }
        if(!projectDescription){
            console.log("> createNewProject ended");
            return res.status(400).json({
                error: "Project description is required"
            });
        }
        if(!departmentName){
            console.log("> createNewProject ended");
            return res.status(400).json({
                error: "Department name is required"
            });
        }
        if(!startDate){
            console.log("> createNewProject ended");
            return res.status(400).json({
                error: "start date is required"
            });
        }
        if(!dueDate){
            console.log("> createNewProject ended");
            return res.status(400).json({
                error: "due date is required"
            });
        }
        if(!assignedTo){
            console.log("> createNewProject ended");
            return res.status(400).json({
                error: "Users need to be assigned"
            });
        }
        if(!projectState){
            console.log("> createNewProject ended");
            return res.status(400).json({
                error: "State is required"
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
        console.log("> createNewProject ended");
        return res.status(200).json(project);
    } catch (error) {
        console.log(error);
        console.log("> createNewProject ended");
        return res.status(500).json({
            error : error
        });
    }
}

const createNewTask = async (req, res) => {
    console.log("> createNewTask initiated");
    try {
        const {
            id, 
            currentProjectName, 
            tasks
        } = req.body;
        const project = await Project.findOne({projectName: currentProjectName});
        if(!project){
            console.log("> createNewTask ended");
            return res.json({
                error: "Such project doesn't exist"
            });
        }
        if(!id){
            return res.json({
                error: "Project owner is missing"
            });
        }else{
            if(id === project.projectOwner){
                const addedTasks = await project.updateOne({$push: {tasks: {$each: tasks}}});
                return res.json(addedTasks);
            }else{
                return res.json({
                    error: "You are not allowed to add tasks"
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createNewProject,
    createNewTask
};