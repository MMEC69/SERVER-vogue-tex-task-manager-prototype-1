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

module.exports = {
    addComment
};