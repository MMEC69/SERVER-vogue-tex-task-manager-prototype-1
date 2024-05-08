const Project = require("../models/project");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

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

module.exports = {
    getProfile,
    getProjects,
    getUsers
};  