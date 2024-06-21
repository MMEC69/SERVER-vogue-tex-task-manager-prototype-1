const path = require("path");
const Project = require(path.join(__dirname, "..", "models", "project"));

// ==============================================================
const addComment = async (req, res) => {
    console.log("> addComment initiated");
    const {
        projectID
    } = req.params;
    const{
        commentor,
        msg,
        commentedDateTime
    } = req.body;
    
    try {
        const foundProject = await Project.findOne({_id: projectID});
        
        if(!foundProject){
            return res.status(404).json({
                error: "There is no such project"
            });
        }

        const {
            assignedTo
        } = foundProject;

        const assignedIDs = assignedTo.map((singleAssgined) => {
            return singleAssgined.id;
        });

        if(assignedIDs.includes(commentor)){
            const userComment = {
                commentor: commentor,
                commentedDateTime: commentedDateTime,
                commentMessage: msg
            };
            try {
                const submittedComment = await Project.findOneAndUpdate(
                    {_id: projectID},
                    {
                        $push: {
                            comments: userComment
                        }
                    }
                );
                console.log("> addComment ended");
                return res.status(200).json({
                    submittedComment
                });
            } catch (error) {
                console.log("> addComment ended");
                res.status(500).json({error: error});
            }
        }
    } catch (error) {
        console.log("> addComment ended");
        res.status(500).json({error: error});
    }
}
// =========================================
const modifyProject = async (req, res) => {
    console.log("> modifyProject initiated");
    const {id, project} = req.body;    
    const {selectedProject} = req.params;
    try {
        let foundProject = await Project.findOne({_id: selectedProject});
        if(!foundProject){
            console.log("> modifyProject ended");
            return res.status(404).json({
                error: "There is no such project" 
            })
        }
        if(foundProject.projectOwner === id){
            try {
                if(project.hasOwnProperty("projectName")){
                    let exists = await Project.findOne({projectName: project.projectName});
                    console.log(project); 
                    if(exists){
                        console.log("> modifyProject ended");
                        return res.status(200).json({
                            error: "Project name is not unique"
                        });
                    }else{
                        console.log("Okay");
                    }
                }
                
                const updatedProject = await Project.findOneAndUpdate(
                    {_id: selectedProject},
                    project,
                    {new: true}
                );
                console.log("> modifyProject ended");
                return res.status(200).json({
                    updatedProject
                });
            } catch (error) {
                console.log(error);
                console.log("> modifyProject ended");
                return res.status(500).json({error: error});
            }
        }else{
            console.log("> modifyProject ended");
            return res.json({
                error: "You are not authorized"
            });
        }
    } catch (error) {
        console.log(error);
        console.log("> modifyProject ended");
        res.status(500).json({error: error});
    }
}
// =================================================
const modifyProjectByName = async (req, res) => {
    console.log("> modifyProject initiated");
    const {id, project} = req.body;    
    const {selectedProject} = req.params;
    try {
        let foundProject = await Project.findOne({projectName: selectedProject});
        if(!foundProject){
            console.log("> modifyProject ended");
            return res.status(404).json({
                error: "There is no such project" 
            })
        }
        if(foundProject.projectOwner === id){
            const updatedProject = await Project.findOneAndUpdate(
                {projectName: selectedProject},
                project,
                {new: true}
            );
            console.log("> modifyProject ended");
            return res.status(200).json({
                updatedProject
            });
        }else{
            console.log("> modifyProject ended");
            return res.json({
                error: "You are not authorized"
            });
        }
    } catch (error) {
        console.log(error);
        console.log("> modifyProject ended");
        res.status(500).json({error: error});
    }
}
// =================================================
const modifyTaskState = async (req, res) =>{
    console.log("> modifyTaskState initiated");
    const {projectID} = req.params;
    const {userID, task} = req.body;
    try {
        let foundProject = await Project.findOne({_id: projectID});
        if(!foundProject){
            console.log("> modifyTaskState ended");
            return res.status(404).json({error: "There is no such project"});
        }

        if(foundProject.projectOwner === userID){
            try {
                const updatedResult = await Project.updateOne(
                    {_id: projectID, "tasks._id": task.taskID},
                    {$set: {"tasks.$.taskState":task.taskState}}
                );
                console.log(updatedResult);
                console.log("> modifyTaskState ended");
                return res.status(200).json(updatedResult);
            }
            catch (error) {
                console.log(error);
                console.log("> modifyTaskState ended");
                return res.status(500).json({error: error});
            }
        }
    } catch (error) {
        console.log(error);
        console.log("> modifyTaskState ended");
        return res.status(500).json({error: error});
    }
}
// =================================================
const taskModify = async (req, res) => {
    console.log("> taskModify initiated");
    const {projectID} = req.params;
    const {
        taskID,
        userID,
        taskModification
    } = req.body;
    
    let foundProject, exists;
    let modifiedTask = {};
    try {
        foundProject = await Project.findOne({_id: projectID});
        if(!foundProject){
            console.log("> taskModify ended");
            return res.status(404).json({
                error: "No such project"
            });
        }
    }
    catch (error) {
        console.log(error);
        console.log("> taskModify ended");
        return res.status(500).json({error: error});
    }
    if(foundProject.projectOwner === userID){
        try {
            const prevTaskArr = (foundProject.tasks).filter((task) => {
                return task._id.toString() === taskID;
            });
            console.log(prevTaskArr)
            const prevTask = prevTaskArr[0];
            

            if(taskModification.hasOwnProperty("newTaskName")){
                exists = await Project.findOne({
                    _id: projectID,
                    "tasks.newTaskName" : taskModification.newTaskName
                }
                );
                if(exists){
                    console.log("> taskModify ended");
                    return res.status(404).json({
                        error: "Task name is already taken"
                    });
                }else{
                    modifiedTask.newTaskName = taskModification.newTaskName;
                }
            }else{
                modifiedTask.newTaskName = prevTask.newTaskName;
            }
            if(taskModification.hasOwnProperty("newTaskDescription")){
                modifiedTask.newTaskDescription = taskModification.newTaskDescription;
            }else{
                modifiedTask.newTaskDescription = prevTask.newTaskDescription;
            }
            if(taskModification.hasOwnProperty("newTaskStartDate")){
                modifiedTask.newTaskStartDate = taskModification.newTaskStartDate;
            }else{
                modifiedTask.newTaskStartDate = prevTask.newTaskStartDate;
            }
            if(taskModification.hasOwnProperty("newTaskDueDate")){
                modifiedTask.newTaskDueDate = taskModification.newTaskDueDate;
            }else{
                modifiedTask.newTaskDueDate = prevTask.newTaskDueDate;
            }
            if(taskModification.hasOwnProperty("assigner")){
                modifiedTask.assginer = taskModification.assigner;
            }else{
                modifiedTask.assigner = prevTask.assigner;
            }
            if(taskModification.hasOwnProperty("assginedProject")){
                modifiedTask.assginedProject = taskModification.assginedProject;
            }else{
                modifiedTask.assginedProject = prevTask.assginedProject;
            }
            if(taskModification.hasOwnProperty("newTaskAssignedTo")){
                modifiedTask.newTaskAssignedTo = taskModification.newTaskAssignedTo;
            }else{
                modifiedTask.newTaskAssignedTo = prevTask.newTaskAssignedTo;
            }
            if(taskModification.hasOwnProperty("taskState")){
                modifiedTask.taskState = taskModification.taskState;
            }else{
                modifiedTask.taskState = prevTask.taskState;
            }
            const updateTask = await Project.findOneAndUpdate(
                {_id: projectID, "tasks._id": prevTask._id},
                {
                    $set: {
                        "tasks.$":modifiedTask
                    }
                }
            );
            console.log(updateTask);
            console.log("> taskModify ended");
            return res.status(200).json({message: "Task modified"});
        } catch (error) {
            console.log(error);
            console.log("> taskModify ended");
            return res.status(500).json({
                error: error
            });
        }
    }else{
        console.log("> taskModify ended");
        return res.status(500).json({
            error: error
        });
    }
}

module.exports = {
    addComment,
    modifyProject,
    modifyTaskState,
    taskModify,
    modifyProjectByName
};