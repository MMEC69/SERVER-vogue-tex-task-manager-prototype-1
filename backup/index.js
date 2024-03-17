const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const serverConnection = require("./serverConnection");
const EmployeeModel = require("./models/Employee");

const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.json());
app.use(cors());

// console.log(serverConnection);
mongoose.connect(serverConnection);

app.post("/register", (req, res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err));
}); 

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("Success");
            }else{
                res.json("The password is incoreect");
            }
        }else{
            res.json("No record exists");
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});