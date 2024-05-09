const Project = require("../models/project");

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

module.exports = {
    addComment,
    modifyProject
};