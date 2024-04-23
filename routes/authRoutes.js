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
    modifyProject } = require("../controllers/authController");

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

module.exports = router;