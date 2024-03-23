const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user");

exports.register = async (req, res) => {
    const { name, email, phone_num, password } = req.body;
    try {
        const userDoc = await User.findOne({ email });
        if(userDoc) {
            throw new Error("Email has already existed.");
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await User.create({
                name,
                email,
                phone_num,
                password: hashedPassword                
            })
            return res.status(201).json({
                success: true,
                message: "User registration completed."
            })
        }
    } catch (error) {
        return res.status(422).json({
            success: false,
            message: error.message
        });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userDoc = await User.findOne({ email });
        if(!userDoc) {
            throw new Error("User not found with this email.");
        }        
        const passwordMatch = await bcrypt.compare(password, userDoc.password);
        if(!passwordMatch) {
            throw new Error("Email or password is wrong.");
        }
        const token = await jwt.sign({email: userDoc.email, id: userDoc._id}, process.env.JWT_KEY);
        const { password: pass, ...other } = userDoc._doc;
        return res.status(201).json({
            success: true,
            message: "Login successful.",
            token,
            userDoc: other
        })
    } catch (error) {
        return res.status(422).json({
            success: false,
            message: error.message
        })
    }
}