const path = require("path");
const moment = require("moment");
const User = require(path.join(__dirname, "..", "models", "user.js"));

// =========================================================
const dateFormat1 = (date) =>{
    console.log("> dateFormat1 initiated");
    let fDate = moment(date).format('YYYY-MM-DD');
    console.log("> dateFormat1 ended");
    return (fDate);
}
// =========================================================
const userEmailFilter = async (assignedTo) =>{
    console.log("> userEmailFilter initiated");
    let filteredUsers = [];
    let userID = "";
    try {
        const userList = await User.find();
        if(!userList){
            console.log("> No users");
            return "No users";
        }
    
        for (let i = 0; i < assignedTo.length; i++) {
            for (let j = 0; j < userList.length; j++) {
                userID = userList[j]._id    //Convert mongoDB obj to str
                userID = userID.toString();
                if(assignedTo[i].id === userID){
                    filteredUsers.push(userList[j].email);
                    break;
                }else{
                    continue;
                }
            }
        }
        console.log(filteredUsers);
        return filteredUsers;
    } catch (error) {
        console.log(error);
        console.log("> userEmailFilter ended");
        return "Error occured with DB";
    }
}
// =========================================================
module.exports = {
    dateFormat1,
    userEmailFilter
}