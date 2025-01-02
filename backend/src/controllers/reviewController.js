
import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middlewares/errorHandler.js";
import { Review } from "../models/reviewModel.js";

// @desc Create a new Reviw
// @route POST /api/Review/
// @access Private
export const createReview= expressAsyncHandler(async (req,res) => {
    try{
        const newReview= await Review.create(req.body);
        res.status(201).json({ status: true, data: newCategory});

    } catch(error){
        throw new AppError(error,400);
    }
})

// @desc Get all reviews
// @route GET /api/review/all
// @access Public
export const getAllReviews = expressAsyncHandler(async (req, res) => {
    try {
        const brands = await Review.find();
        res.status(200).json({ status: true, data: brands });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Get a Review by ID
// @route GET /api/Review/brand/:id
// @access Public
export const getAReviewBySld = expressAsyncHandler(async (req, res) => {
    try {
        const reviews = await Review.findOne({ id: req.params.id  });
        if (brand) {
            res.status(200).json({ status: true, data: brand });
        } else {
            res.status(404).json({ message: "Brand Not Found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Get a brand by ID
// @route GET /api/brand/:id
// @access Public
export const getAReviewById = expressAsyncHandler(async (req, res) => {
    try {
        const review = await Brand.findById(req.params.id);
        if (brand) {
            res.status(200).json({ status: true, data: brand });
        } else {
            res.status(404).json({ message: "Brand Not Found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Update a brand
// @route PUT /api/brand/:id
// @access private
export const updateAReview = expressAsyncHandler(async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (review) {
            res.status(200).json({ status: true, data: review });
        } else {
            res.status(404).json({ message: "Review Not Found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Delete a Review
// @route DELETE /api/review/:id
// @access private
export const deleteAReview = expressAsyncHandler(async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (review) {
            res.status(200).json({ status: true, message: "Review Deleted Successfully!" });
        } else {
            res.status(404).json({ message: "Review Not Found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


// @desc Update is Approved
// @route DELETE /api/review/approve-request
// @access private
export const approveAReview = expressAsyncHandler(async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id,{isApproved:req.body.isApproved},{new: true});
        if (review) {
            res.status(200).json({ status: true, message: "Review Approved Successfully!" });
        } else {
            res.status(404).json({ message: "Review Not Found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
