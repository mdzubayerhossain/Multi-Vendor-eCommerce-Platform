import express from "express";
import {
    deleteUserProfile,
    getAllProfile,
    loginUser,
    profile,
    registerUser,
    updateProfile,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", protect, profile);
userRouter.put("/profile", protect, updateProfile);
userRouter.get("/users", protect, getAllProfile);
userRouter.delete("/:id", protect, deleteUserProfile);

export default userRouter;
