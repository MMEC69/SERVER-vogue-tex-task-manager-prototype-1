const Project = require("../models/project");

const deleteProject = async (req, res) => {
    try {
        const {projectToBeDeleted} = req.params;
        console.log(`Project to be delted - ${projectToBeDeleted}.................`);
        const {data} = req.body;

        let exist = await Project.findOne(
            {projectName : projectToBeDeleted}
        );
 
        if(!exist){
            return res.status(404).json("There is no such project!");
        }
        
        // checking the deleter if they are the project owner or not
        if(exist.projectOwner.email === data){
            const deletedProject = await Project.deleteOne(
                {projectName: projectToBeDeleted}
            );
            console.log(deletedProject);
            return res.status(200).json({deletedProject});
        }
        else{
            console.log("You are not authorized to perform this!");
            return res.status(404).json({error: "You are not authorized to perform this!"});
        }
    } catch (error) {
        return res.status(500).json({error: "Unknown Error!"});
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