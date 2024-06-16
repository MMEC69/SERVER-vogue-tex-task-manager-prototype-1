const path = require("path");
const Project = require(path.join(__dirname, "..", "models", "project"));
const User = require(path.join(__dirname, "..", "models", "user"));
const jwt = require("jsonwebtoken");

const getProfile = (req, res) => {
    console.log("> getProfile initiated");
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, 
            process.env.JWT_SECRET, 
            {}, 
            (error, user) => {
                console.log(error);
                if (error) throw error;
                console.log("> getProfile ended");
                res.status(200).json(user);
            });
    }else{
        console.log("> getProfile ended");
        res.status(404).json(null);
    }
}
// ===================================================
const getProjects = async (req, res) => {
    console.log("> getProjects initiated");
    try {
        const projectSet = await Project.find();
        if(!projectSet){
            res.status(404).json({
                error: "No projects"
            });
        }
        console.log("> getProjects Ended");
        return res.status(200).json(projectSet);
    } catch (error) {
        console.log(error);
        console.log("> getProjects Ended");
        return res.status(404).json({
            error: error
        })
    }
}
// ==================================================
const getUsers = async (req, res) => {
    console.log("> getUsers initiated");
    try {
        const users = await User.find();
        if(!users){
            console.log("> getUsers ended");
            return res.status(200).json({msg: "There are no users"});
        }
        const usersInfo = users.map((userInfo) => {
            arrangedUserInfo = {
                _id: userInfo._id,
                fullName: userInfo.fullName, 
                email: userInfo.email
            }
            return arrangedUserInfo;
        });
        console.log("> getUsers ended");
        return res.status(200).json(usersInfo);
    } catch (error) {
        console.log(error);
        console.log("> getUsers ended");
        return res.status(500).json({
            error : error
        });
    }
}

// ==================================================
const getComments = async (req, res) => {
    const {
        id
    } = req.params
    console.log("> getComments initiated");
    try {
        const projectSet = await Project.find({_id: id});
        const {
            comments
        } = projectSet[0];
        console.log(comments);
        console.log("> getComments Ended");
        return res.status(200).json({ comments });
    } catch (error) {
        console.log(error);
        console.log("> getComments Ended");
        return res.status(404).json({
            error: error
        })
    }
}
module.exports = {
    getProfile,
    getProjects,
    getUsers,
    getComments
};  