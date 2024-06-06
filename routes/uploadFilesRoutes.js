const express = require("express");
const router = express.Router();
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const originURL = process.env.originURL;

// fileUpload storage
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        console.log("File is been read........");
        console.log(file);
        console.log("Destination set.......");
        if(!fs.existsSync(`./attachments`)){
            console.log("The Directory doens't exist.......");
            fs.mkdirSync (`./attachments`, (err) => {
                    if(err) throw err;
                    console.log("Directory created......");
                }
            );
        }
        else{
            console.log("Directory exists......");
        }
        return cb(null, `./attachments`);
    },
    filename: function(req, file, cb){
        console.log("File name set.........");
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({storage: storage});

//middleware
router.use(
    cors({
        credentials: true,
        origin: originURL
    })
);

const {
    uploadFiles
} = require("../controllers/uploadFilesController");

router.post("/uploadProjectAttachments", upload.array("files"), uploadFiles);

module.exports = router;