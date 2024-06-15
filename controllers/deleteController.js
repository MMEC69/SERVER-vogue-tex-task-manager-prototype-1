const path = require("path");
const Project = require(path.join(__dirname, "..", "models", "project"));

const deleteProject = async (req, res) => {
    try {
        const {projectToBeDeleted} = req.params;
        const {projectDeleter} = req.body;

        let exist = await Project.findOne(
            {_id : projectToBeDeleted}
        );
        if(!exist){
            return res.status(404).json("There is no such project");
        }
        
        if(exist.projectOwner === projectDeleter){
            const deletedProject = await Project.deleteOne(
                {_id: projectToBeDeleted}
            );
            return res.status(200).json({deletedProject});
        }
        else{
            console.log("You are not authorized");
            return res.status(404).json({error: "You are not authorized"});
        }
    } catch (error) {
        return res.status(500).json({error: error});
    }
}

const deleteTask = async (req, res) => {
    try {
        const {projectName} = req.params;
        const {
            user,
            newTaskName
        } = req.body;

        const exist = await Project.findOne(
            {projectName : projectName}
        );
        if(!exist){
            return res.status(404).json("There is no such project");
        }
        console.log(newTaskName);
        if(exist.projectOwner.email === user.email){
            const deletedTask = await Project.findOneAndUpdate(
                {projectName: projectName},
                {$pull: {
                    tasks:{newTaskName: newTaskName} 
                }}
            );
            console.log("Task Deleted!");
            return res.status(200).json({deleteProject});
        }else{
            console.log("You are not authorized to perform this!");
            return res.status(404).json({error: "You are  not authorized to perform this!"});
        }
    } catch (error) {
        return res.status(500).json({error: "Unknown Error!"});
    }
}

module.exports = {
    deleteProject,
    deleteTask
};