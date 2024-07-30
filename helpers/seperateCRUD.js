const path = require("path");
const Project = require(path.join(__dirname, "..", "models", "project.js"));

const changeProjectState = async (projectID, newState) => {
    console.log("> changeProjectState initiated");
    try {
        const result = await Project.findOneAndUpdate(
            {_id: projectID},
            {$set: {
                projectState: newState
                }
            },
            {new: true}
        );
    } catch (error) {
        console.log(error);
        console.log("> changeProjectState ended");
        return "Error Encountered";
    }
}

module.exports = {
    changeProjectState
}