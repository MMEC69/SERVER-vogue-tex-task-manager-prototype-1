const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: String,
    email: {
        type: String,
        unique: true
    },
    password: String
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;