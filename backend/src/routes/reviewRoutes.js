import express from "express";
import {
    approveAReview,
    createReview,
    deleteAReview,
    getAReviewById,
    getAllReviews,
    updateAReview,
    } from "../controllers/reviewController.js";
const reviewRouter = express.Router();

reviewRouter.post("/", createReview);
reviewRouter.get("/all",getAllReviews);
reviewRouter.get("/:id", getAReviewById); // Ensure this route
reviewRouter.put("/:id", updateAReview);
reviewRouter.put("/approve-request", approveAReview);
reviewRouter.delete("/:id",  deleteAReview); // Ensure this route

export default reviewRouter;
