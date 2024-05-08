const express = require("express");
const router = express.Router();
const cors = require("cors");
const { 
    test, 
    registerUser, 
    loginUser, 
    getProfile, 
    createNewProject, 
    createNewTask, 
    getProjects, 
    getUsers,
    modifyProject,
    deleteProject
} = require("../controllers/authController");

const {
    addComment
} = require("../controllers/ProjectModify");

//middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:3001"
    })
);

router.get("/", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);
router.post("/createNewProject", createNewProject);
router.put("/createNewTask", createNewTask);
router.get("/getProjects", getProjects);
router.get("/getUsers", getUsers);
router.put("/modifyTheProject/:selectedProject", modifyProject);
router.put("/deleteTheProject/:projectToBeDeleted", deleteProject);
router.put("/addComment/:projectName", addComment);


module.exports = router;