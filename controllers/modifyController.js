const path = require("path");
const Project = require(path.join(__dirname, "..", "models", "project"));

const addComment = async (req, res) => {
    const {projectName} = req.params;
    const{
        commentor,
        msg,
        commentedDateTime
    } = req.body;
    
    //satisfy whenther user is authorized and project is available
    try {
        const foundProject = await Project.findOne({projectName: projectName});
        
        if(!foundProject){
            return res.status(404).json({
                error: "There is no such project"
            });
        }

        //any assginedTo can comment
        const {
            assignedTo
        } = foundProject;

        const assignedEmails = assignedTo.map((singleAssgined) => {
            return singleAssgined.email;
        });

        if(assignedEmails.includes(commentor.email)){
            const userComment = {
                commentor: commentor,
                commentedDateTime: commentedDateTime,
                commentMessage: msg
            };
            try {
                const submittedComment = await Project.findOneAndUpdate(
                    {projectName: projectName},
                    {
                        $push: {
                            comments: userComment
                        }
                    }
                );
                return res.status(200).json({
                    submittedComment
                });
            } catch (error) {
                res.status(500).json({error: "Unknown Error!\nError: Data didn't pass to mongo"});
            }
        }
    } catch (error) {
        res.status(500).json({error: "Unknown Error!"});
    }
}

const modifyProject = async (req, res) => {
    const {user, project} = req.body;    
    const {selectedProject} = req.params;
    try {
        
        let foundProject = await Project.findOne({projectName: selectedProject});
        
        //Check if the project is avaialbe in the database to update
        if(!foundProject){
            return res.status(404).json({
                error: "There is no such project in database!" 
            })
        }
        
        if(foundProject.projectOwner.email === user.email){
            try {
                //check if new project name is unique
                if(project.hasOwnProperty("projectName")){
                    let exists = await Project.findOne({projectName: project.projectName});
                    console.log(project); 
                    if(exists){
                        return res.json({
                            error: "Project name is alredy taken, provide a diffrent name!"
                        });
                    }else{
                        console.log("Okay!");
                    }
                }
                
                const updatedProject = await Project.findOneAndUpdate(
                    {projectName: selectedProject},
                    project,
                    {new: true}
                );
                return res.status(200).json({
                    updatedProject
                });
            } catch (err) {
                return res.status(500).json({error: "Unknown Error!"});
            }
        }else{
            return res.json({
                error: "You are not allowed to perform such action!"
            });
        }
    } catch (error) {
        res.status(500).json({error: "Unknown Error!"});
    }
}

const modifyTaskState = async (req, res) =>{
    const {selectedProject} = req.params;
    console.log(`Selected project ${selectedProject}`);
    const {user, task} = req.body;
    try {
        let foundProject = await Project.findOne({projectName: selectedProject});

        if(!foundProject){
            return res.status(404).json({
                error: "There is no such project in database!"
            });
        }

        if(foundProject.projectOwner.email === user.email){
            try {
                const updatedResult = await Project.updateOne(
                    {projectName: selectedProject, "tasks.newTaskName": task.taskName},
                    {$set: {
                        "tasks.$.taskState":task.taskState 
                    }}
                );
                console.log(updatedResult);
                return res.status(200).json("Task state changed");
            }
            catch (error) {
                return res.status(500).json({
                    error: "Unknown Error!"
                });
            }
        }
    } catch (error) {
        return res.status(500).json({
            error: "Unknown Error!"
        });
    }
}

const taskModify = async (req, res) => {
    console.log("Function task modify initiated....");
    const {selectedProject} = req.params;
    const {
        prevTaskName,
        user,
        taskModification
    } = req.body
    let foundProject, exists;
    let modifiedTask = {};
    console.log("Obj prop destructred.........");
    try {
        foundProject = await Project.findOne({projectName: selectedProject});
        if(!foundProject){
            return res.status(404).json({
                error: "There is no such project in database!"
            });
        }
    }
    catch (error) {
        console.log("Failed to connect to DB.........");
        return res.status(500).json({
            error: error
        });
    }
    console.log("Project existence confirmed.........");
    if(foundProject.projectOwner.email === user.email){
        console.log("Project Ownership authorized......");
        // =================================================
        try {
            const prevTaskArr = (foundProject.tasks).filter((task) => {
                return task.newTaskName === prevTaskName;
            });
            const prevTask = prevTaskArr[0];
            console.log("PrevTask acquired...........");
            // =================================================
            if(taskModification.hasOwnProperty("newTaskName")){
                console.log("Task has newTaskName prop...........");
                exists = await Project.findOne(
                    {
                        projectName: selectedProject,
                        "tasks.newTaskName" : taskModification.newTaskName
                    }
                );
                if(exists){
                    return res.status(404).json({
                        error: "TaskName is alreaday taken, try again!"
                    });
                }else{
                    modifiedTask.newTaskName = taskModification.newTaskName;
                    console.log("Task name is fine....................");
                }
            }else{
                console.log("Task dont have newTaskName prop...........");
                modifiedTask.newTaskName = prevTaskName;
                console.log(prevTaskName);

            }
            // =================================================
            if(taskModification.hasOwnProperty("newTaskDescription")){
                modifiedTask.newTaskDescription = taskModification.newTaskDescription;
            }else{
                modifiedTask.newTaskDescription = prevTask.newTaskDescription;
            }
            // =================================================
            if(taskModification.hasOwnProperty("newTaskStartDate")){
                modifiedTask.newTaskStartDate = taskModification.newTaskStartDate;
            }else{
                modifiedTask.newTaskStartDate = prevTask.newTaskStartDate;
            }
            // =================================================
            if(taskModification.hasOwnProperty("newTaskDueDate")){
                modifiedTask.newTaskDueDate = taskModification.newTaskDueDate;
            }else{
                modifiedTask.newTaskDueDate = prevTask.newTaskDueDate;
            }
            // =================================================
            if(taskModification.hasOwnProperty("assigner")){
                modifiedTask.assginer = taskModification.assigner;
            }else{
                modifiedTask.assigner = prevTask.assigner;
            }
            // =================================================
            if(taskModification.hasOwnProperty("assginedProject")){
                modifiedTask.assginedProject = taskModification.assginedProject;
            }else{
                modifiedTask.assginedProject = prevTask.assginedProject;
            }
            // =================================================
            if(taskModification.hasOwnProperty("newTaskAssignedTo")){
                modifiedTask.newTaskAssignedTo = taskModification.newTaskAssignedTo;
            }else{
                modifiedTask.newTaskAssignedTo = prevTask.newTaskAssignedTo;
            }
            // =================================================
            if(taskModification.hasOwnProperty("taskState")){
                modifiedTask.taskState = taskModification.taskState;
            }else{
                modifiedTask.taskState = prevTask.taskState;
            }
            // =================================================
            console.log("Task name resolved..............");
            const updateTask = await Project.findOneAndUpdate(
                {projectName: selectedProject, "tasks.newTaskName": prevTaskName},
                {
                    $set: {
                        "tasks.$":modifiedTask
                    }
                }
            );
            console.log(updateTask);
            console.log("Project updated..........");
            return res.status(200).json({message: "Task modified"});
        } catch (error) {
            console.log("Failed to establish connection with DB.........");
            return res.status(500).json({
                error: "Unknown Error!"
            });
        }
    }
}

module.exports = {
    addComment,
    modifyProject,
    modifyTaskState,
    taskModify
};