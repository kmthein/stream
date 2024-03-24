const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
    try {
        const token = req.header("Authorization").split(" ")[1];
        if(!token) {
            throw new Error("Not Authorized.");
        }
        const decryptedTokenDetails = jwt.verify(token, process.env.JWT_KEY);
        if(!decryptedTokenDetails) {
            throw new Error("Not Authorized");
        }
        req.userId = decryptedTokenDetails.userId;
        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: error.message})        
    }
}