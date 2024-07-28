const path = require("path");
const Project = require(path.join(__dirname, "..", "models", "project"));
const fs = require("fs");

const deleteProject = async (req, res) => {
    console.log("> deleteProject initiated");
    try {
        const {projectToBeDeleted} = req.params;
        const {projectDeleter} = req.body;

        let exist = await Project.findOne(
            {_id : projectToBeDeleted}
        );
        if(!exist){
            console.log("> deleteProject ended");
            return res.status(404).json("There is no such project");
        }
        
        if(exist.projectOwner === projectDeleter){
            const attachedDocs = exist.attachments;
            attachedDocs?.map((attachedDoc) => {
                fs.unlink(`${attachedDoc.destination}/${attachedDoc.filename}`,() => {
                    console.log("> File Deleted");
                });
            });
            const deletedProject = await Project.deleteOne(
                {_id: projectToBeDeleted}
            );
            return res.status(200).json({deletedProject});
        }
        else{
            console.log("> deleteProject ended");
            return res.status(404).json({error: "You are not authorized"});
        }
    } catch (error) {
        console.log("> deleteProject ended");
        return res.status(500).json({error: error});
    }
}

const deleteTask = async (req, res) => {
    console.log("> deleteTask initiated");
    try {
        const {projectID} = req.params;
        const {
            id,
            taskID
        } = req.body;

        const exist = await Project.findById(projectID);
        if(!exist){
            console.log("> deleteTask ended");
            return res.status(404).json({error: "There is no such project"});
        }
        if(exist.projectOwner === id){
            const deletedTask = await Project.findOneAndUpdate(
                {_id: projectID},
                {$pull: {
                    tasks:{_id: taskID} 
                }}
            );
            console.log("> deleteTask ended");
            return res.status(200).json(deletedTask);
        }else{
            console.log("> deleteTask ended");
            return res.status(404).json({error: "You are not authorized"});
        }
    } catch (error) {
        console.log("> deleteTask ended");
        return res.status(500).json({error: error});
    }
}

module.exports = {
    deleteProject,
    deleteTask
};