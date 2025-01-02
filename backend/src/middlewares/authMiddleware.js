import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { AppError } from "./errorHandler.js";

// Middleware to protect routes and verify JWT token
export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            return next(new AppError("Not Authorized, token failed", 401));
        }
    }

    if (!token) {
        return next(new AppError("Not Authorized, no token", 401));
    }
};

// Middleware to authorize based on user roles
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError("You don't have permissions", 403));
        }
        next();
    };
};
