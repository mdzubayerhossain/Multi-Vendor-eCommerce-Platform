import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middlewares/errorHandler.js";

// @desc Register a new user
// @route POST /api/user/register
// @access Public
export const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password, username } = req.body;
    console.log("Request Body:", req.body);

    // Check for missing required fields
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        // Create the user
        const user = await User.create({
            name,
            email,
            password,
            username,  // Ensure username is set
        });

        // If the user is created successfully, return the response
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id), // Generate a token for the user
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        // Handle any unexpected errors
        console.error("Server error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Authenticate a user and get token
// @route POST /api/user/login
// @access Public
export const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check for missing required fields
        if (!email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id), // Generate a token for the user
            });
        } else {
            res.status(401).json({ message: "Invalid Email or Password" });
        }
    } catch (error) {
        // Handle any unexpected errors
        console.error("Server error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Helper function to generate a JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc Get user profile
// @route GET /api/user/profile
// @access Private
export const profile = expressAsyncHandler(async (req, res) => {
    const { _id } = req.user; // Use req.user instead of req.body

    try {
        // Find the user by ID
        const user = await User.findById(_id);
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                isActive: user.isActive
            });
        } else {
            res.status(404).json({ message: "User Not Found!" });
        }
    } catch (error) {
        // Handle any unexpected errors
        console.error("Server error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Update user profile
// @route PUT /api/user/profile
// @access Private
export const updateProfile = expressAsyncHandler(async (req, res) => {
    const { _id } = req.user; // Use req.user instead of req.body

    try {
        // Find the user by ID
        const user = await User.findById(_id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = await bcrypt.hash(req.body.password, 12);
            }
            user.address = req.body.address || user.address;
            user.phone = req.body.phone || user.phone;

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                phone: updatedUser.phone,
                isActive: updatedUser.isActive,
                address: updatedUser.address
            });
        } else {
            res.status(404).json({ message: "User Not Found!" });
        }
    } catch (error) {
        // Handle any unexpected errors
        console.error("Server error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Get all user profiles
// @route GET /api/user/users
// @access Private
export const getAllProfile = expressAsyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        if (users.length > 0) {
            res.json(users);
        } else {
            res.status(404).json({ message: "No users found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Delete user profile
// @route DELETE /api/user/user/:id
// @access Private
export const deleteUserProfile = expressAsyncHandler(async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User Removed!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
