import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";


export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if(!token){
            return res.status(401).json({message: "Please login to access this route."})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({message: "Please login to access this route."})
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({message: "User does not exist."})
        }

        req.user = user

        next()

    } catch (err) {
        console.log("Error in protectRoute middleware: ", err.message);
        return res.status(500).json({message: "Internal Server Error."})
    }
}