const User = require("../models/user");
const Project = require("../models/project"); 
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");


const test = (req, res) => {
    res.json("Test is working");
}

const registerUser = async (req, res) => {
    try{
        const {fullName, email, password} = req.body;
        //Check if name is entered
        if(!fullName){
            return res.json({
                error: "name is required!"
            });
        }
        //Check if password is good
        if(!password || password.length < 13){
            return res.json({
                error: "Password is required and it must be atlease 12 characters in length"
            });
        }
        //Check email
        const exists = await User.findOne({email});
        if(exists){
            return res.json({
                error: "Email is taken already!"
            });
        }

        const hashedPassword = await hashPassword(password)
        
        //create user in db
        const user = await User.create({
            fullName, email, password: hashedPassword
        });

        return res.json(user);
    }catch (error){
        console.log(error); 
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        //Check if user exists
        const user = await User.findOne({email});
        
        if(!user){
            return res.json({
                error: "No user found"
            });
        }

        //Check if passwords match
        const match = await comparePassword(password, user.password);
        if(match){
            jwt.sign({
                email: user.email, 
                id: user._id, 
                fullName: user.fullName
            }, process.env.JWT_SECRET,
            {},
            (err, token) => {
                if(err) throw err;
                res.cookie("token", token).json(user);
            });
        }
        if(!match){
            res.json({
                error: "Passwords Don't Match!"
            });
        }
    } catch (error) {
        console.log(error);
    }
}

const getProfile = (req, res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, 
            process.env.JWT_SECRET, 
            {}, 
            (err, user) => {
                if (err) throw err;
                res.json(user);
            });
    }else{
        res.json(null);
    }
}

const createNewProject = async (req, res) => {
    try {
        const {
            projectOwner,
            projectName, 
            projectDescription, 
            departmentName, 
            startDate, 
            dueDate, 
            assignedTo, 
            projectState
        } = req.body;

        //Check if project owner is given
        if(!projectOwner){
            return res.json({
                error: "Project Owner is required!"
            });
        }

        //Check if project name is given
        if(!projectName){
            return res.json({
                error: "Project Name is required!"
            });
        }

        //check if project name is unique
        const exists = await Project.findOne({projectName});
        if(exists){
            return res.json({
                error: "Project name is alredy taken, provide a diffrent name!"
            });
        }

        //Check if project description is given
        if(!projectDescription){
            return res.json({
                error: "Project description can't be empty!"
            });
        }

        //Check if department name is given
        if(!departmentName){
            return res.json({
                error: "Department name is required!"
            });
        }

        //Check if startDate is given
        if(!startDate){
            return res.json({
                error: "start date is required!"
            });
        }

        //Check if dueDate is given
        if(!dueDate){
            return res.json({
                error: "due date is required!"
            });
        }

        //Check if users are assigned
        if(!assignedTo){
            return res.json({
                error: "Users need to be assigned!"
            });
        }

        //Check if project state is given
        if(!projectState){
            return res.json({
                error: "State is required!"
            });
        }

        const project = await Project.create({
            projectOwner,
            projectName,
            projectDescription,
            departmentName, 
            startDate, 
            dueDate, 
            assignedTo, 
            projectState
        });
        return res.json(project);
    } catch (error) {
        console.log("Error: " +error);
    }
}

const createNewTask = async (req, res) => {
    try {
        const {currentProject, tasks} = req.body;
        const {currentProjectOwner, currentProjectName} = currentProject
        const projectName = currentProjectName;
        const newTasks = tasks
        
        const project = await Project.findOne({projectName});
        if(!project){
            console.log(currentProjectName)
            // console.log(tasks)
            return res.json({
                error: "Such project doesn't exist!"
            })
        }
        if(currentProjectOwner != project.projectOwner){
            return res.json({
                error: "You are not allowed to add tasks!"
            });
        }
        console.log(project);

        const addedTasks = await project.updateOne({$push: {tasks: {$each: tasks}}});
        console.log(addedTasks);

        return res.json(addedTasks);
    } catch (error) {
        console.log("Error: " +error);
    }
}

const getProjects = async (req, res) => {
    try {
        const projectSet = await Project.find();
        if(!projectSet){
            res.json({error: "There are no projects!"});
        }
        return res.json(projectSet);
    } catch (error) {
        console.log("Error: " +error);
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        if(!users){
            res.json({error: "There are no users"});
        }
        filteredUsers = users.map((user) => {
            filteredUser = {fullName: user.fullName, email: user.email}
            return filteredUser;
        });

        return res.json(filteredUsers);
    } catch (error) {
        console.log("Error: " +error);
    }
}

const modifyProject = async (req, res) => {
    const {projectModifier} = req.body;
    const {project} = req.body;
    
    const {selectedProject} = req.params;
    try {
        
        let foundProject = await Project.findOne({projectName: selectedProject});
        
        //Check if the project is avaialbe in the database to update
        if(!foundProject){
            return res.status(404).json({
                error: "There is no such project in database!" 
            })
        }
        
        if(foundProject.projectOwner === projectModifier){
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

const deleteProject = async (req, res) => {
    try {
        //take the passed data
        const {projectToBeDeleted} = req.params;
        //Project owner doesn't mickup by req.body
        // const {data} = req.body;
        data = "2@gmail.com";

        //fetch the project
        let exist = await Project.findOne(
            {projectName : projectToBeDeleted}
        );
 
        if(!exist){
            return res.status(404).json("There is no such project!");
        }
        console.log(exist.projectOwner);
        console.log(req.body);
        // checking the deleter if they are the project owner or not
        if(exist.projectOwner === data){
            console.log("fff");
            const deletedProject = await Project.deleteOne(
                {projectName: projectToBeDeleted}
            );
            console.log(deletedProject);
            return res.status(200).json({deletedProject});
        }
    } catch (error) {
        return res.status(500).json({error: "Unknow Error!"});
    }
}


module.exports = {
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
}