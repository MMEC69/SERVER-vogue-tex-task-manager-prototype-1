const express = require("express");
const router = express.Router();
const cors = require("cors");
const { test, registerUser, loginUser, getProfile, createNewProject, createNewTask } = require("../controllers/authController");

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

module.exports = router;