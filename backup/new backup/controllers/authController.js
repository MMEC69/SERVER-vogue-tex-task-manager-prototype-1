const User = require("../models/user");

const test = (req, res) => {
    console.log('Testing..');
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

        const user = await User.create({
            fullName, email, password
        });

        return res.json(user);
    }catch (error){
        console.log(error); 
    }
}

module.exports = {
    test,
    registerUser
}