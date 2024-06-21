const path = require("path");
const User = require(path.join(__dirname, "..", "models", "user"));
const { hashPassword, comparePassword } = require(path.join(__dirname, "..", "helpers", "auth"));
const {initialDeco} = require(path.join(__dirname, "..", "helpers", "textDecorations"));
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    console.log(`${initialDeco}Registration${initialDeco}`);
    try{
        const {fullName, email, password} = req.body;
        //Check if name is entered
        if(!fullName){
            return res.json({
                error: "name is required!"
            });
        }
        //Check if password is good
        if(!password || password.length < 12){
            return res.json({
                error: "Password is required and it must be atleast 12 characters in length!"
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
            fullName, 
            email, 
            password: hashedPassword
        });
        return res.json(user);
    }catch (err){
        console.log(err); 
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
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    registerUser,
    loginUser
}