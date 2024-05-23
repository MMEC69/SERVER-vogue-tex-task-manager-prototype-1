const Project = require("../models/project");

//rearrage the attachments and store them
const uploadFiles = (req, res) => {
    const files = req.files;
    console.log("req file.............");
    console.log(files);
    if(Array.isArray(files) && files.length > 0){
        console.log("Files is a valid array.....");
        res.json(files);
    }else{
        console.log("Files is not a valid array........");
        throw new Error("File didn't upload........");
    }
    console.log("Files uploaded........");
}

module.exports = {
    uploadFiles
};