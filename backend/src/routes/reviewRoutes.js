// src/routes/reviewRoutes.js
import express from "express";
import {
    createReview,
    getAllReviews,
    getAReviewById,
    updateAReview,
    deleteAReview,
    approveAReview
} from "../controllers/reviewController.js";
import { protect } from "../middlewares/authMiddleware.js";

const reviewRouter = express.Router();

reviewRouter.post("/", protect, createReview);
reviewRouter.get("/all", getAllReviews); // Ensure this route is correct
reviewRouter.get("/:id", getAReviewById);
reviewRouter.put("/:id", protect, updateAReview);
reviewRouter.delete("/:id", protect, deleteAReview);
reviewRouter.put("/:id/approve", protect, approveAReview);

export default reviewRouter;
