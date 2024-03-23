const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_num: {
        type: String,
        default: ""
    },
    password: {
        type: String
    },
    picture: {
        type: String,
        default: ""
    }
})

const userModel = model("User", userSchema);

module.exports = userModel;