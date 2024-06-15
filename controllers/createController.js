const path = require("path");
const Project = require(path.join(__dirname, "..", "models", "project"));

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

        if(!projectOwner){
            return res.json({
                error: "Project Owner is required!"
            });
        }
        if(projectName){
            const exists = await Project.findOne({projectName});
            if(exists){
                return res.json({
                    error: "Project name is alredy taken, provide a diffrent name!"
                });
            }
        }else{
            return res.json({
                error: "Project Name is required!"
            });
        }
        if(!projectDescription){
            return res.json({
                error: "Project description can't be empty!"
            });
        }
        if(!departmentName){
            return res.json({
                error: "Department name is required!"
            });
        }
        if(!startDate){
            return res.json({
                error: "start date is required!"
            });
        }
        if(!dueDate){
            return res.json({
                error: "due date is required!"
            });
        }
        if(!assignedTo){
            return res.json({
                error: "Users need to be assigned!"
            });
        }
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
        console.log(error);
    }
}

const createNewTask = async (req, res) => {
    try {
        const {
            id, 
            currentProjectName, 
            tasks
        } = req.body;
        const project = await Project.findOne({projectName: currentProjectName});
        if(!project){
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