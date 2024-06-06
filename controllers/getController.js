const path = require("path");
const Project = require(path.join(__dirname, "..", "models", "project"));
const User = require(path.join(__dirname, "..", "models", "user"));
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
            res.status(200).json({msg: "There are no users"});
        }
        const usersInfo = users.map((userInfo) => {
            arrangedUserInfo = {
                _id: userInfo._id,
                fullName: userInfo.fullName, 
                email: userInfo.email
            }
            return arrangedUserInfo;
        });

        return res.status(200).json(usersInfo);
    } catch (err) {
        console.log(`err : ${err}`);
        res.status(500).json({
            err : "Server didn't respond",
            errCode: err
        });
    }
}

module.exports = {
    getProfile,
    getProjects,
    getUsers
};  