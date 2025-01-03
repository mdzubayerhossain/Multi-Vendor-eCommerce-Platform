import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middlewares/errorHandler.js";
import { Review } from "../models/reviewModel.js";

// @desc Create a new review
// @route POST /api/review/
// @access Private
export const createReview = expressAsyncHandler(async (req, res) => {
    const { comment, rating, product } = req.body;
    const user = req.user.id; // Use the authenticated user's ID

    // Check for missing required fields
    if (!user || !comment || !rating || !product) {
        throw new AppError("All fields are required (user, comment, rating, product)", 400);
    }

    try {
        const newReview = await Review.create({
            user,
            comment,
            rating,
            product,
        });
        res.status(201).json({ status: true, data: newReview });
    } catch (error) {
        console.error("Error creating review:", error); // Add debug log
        if (error.code === 11000) {
            throw new AppError("Review already exists for this user and product", 400);
        }
        throw new AppError("Server error", 500);
    }
});

// @desc Get all reviews with pagination
// @route GET /api/review/all
// @access Public
export const getAllReviews = expressAsyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const reviews = await Review.find().skip(skip).limit(limit).populate("user", "name").populate("product", "name");
        const total = await Review.countDocuments();

        res.status(200).json({ status: true, data: reviews, total, page, pages: Math.ceil(total / limit) });
    } catch (error) {
        console.error("Error getting reviews:", error); // Add debug log
        throw new AppError("Server error", 500);
    }
});

// @desc Get a review by ID
// @route GET /api/review/:id
// @access Public
export const getAReviewById = expressAsyncHandler(async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate("user", "name").populate("product", "name");
        if (!review) {
            throw new AppError("Review Not Found!", 404);
        }
        res.status(200).json({ status: true, data: review });
    } catch (error) {
        console.error("Error getting review by ID:", error); // Add debug log
        throw new AppError("Server error", 500);
    }
});

// @desc Update a review
// @route PUT /api/review/:id
// @access Private
export const updateAReview = expressAsyncHandler(async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("user", "name").populate("product", "name");
        if (!review) {
            throw new AppError("Review Not Found!", 404);
        }
        res.status(200).json({ status: true, data: review });
    } catch (error) {
        console.error("Error updating review:", error); // Add debug log
        throw new AppError("Server error", 500);
    }
});

// @desc Delete a review
// @route DELETE /api/review/:id
// @access Private
export const deleteAReview = expressAsyncHandler(async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            throw new AppError("Review Not Found!", 404);
        }
        res.status(200).json({ status: true, message: "Review Deleted Successfully!" });
    } catch (error) {
        console.error("Error deleting review:", error); // Add debug log
        throw new AppError("Server error", 500);
    }
});

// @desc Approve a review
// @route PUT /api/review/:id/approve
// @access Private
export const approveAReview = expressAsyncHandler(async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true }).populate("user", "name").populate("product", "name");
        if (!review) {
            throw new AppError("Review Not Found!", 404);
        }
        res.status(200).json({ status: true, message: "Review Approved Successfully!", data: review });
    } catch (error) {
        console.error("Error approving review:", error); // Add debug log
        throw new AppError("Server error", 500);
    }
});
