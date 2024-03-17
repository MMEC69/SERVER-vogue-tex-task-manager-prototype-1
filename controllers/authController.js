const User = require("../models/user");
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
        const exists = await User.findOne({email})
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

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}