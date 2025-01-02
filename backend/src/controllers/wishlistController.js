import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middlewares/errorHandler.js";
import { Wishlist } from "../models/wishlistModel.js"
// @desc Create a new wishlist
// @route POST /api/wishlist/
// @access private
export const createWishlist= expressAsyncHandler(async (req,res) => {
    try{
        const newWishlist = await Wishlist.create(req.body);
        res.status(201).json({ status: true, data: newWishlist});

    } catch(error){
        throw new AppError(error,400);
    }
})
// @desc Get all wishlists
// @route GET /api/wishlist/all
// @access Public
export const getAllWishlists = expressAsyncHandler(async (req, res) => {
    try {
        const wishlists = await Wishlist.find();
        res.status(200).json({ status: true, data: wishlists });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Get a wishlist by slug
// @route GET /api/wishlist/:slug
// @access Public
export const getAWishlistBySlug = expressAsyncHandler(async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ slug: req.params.slug });
        if (wishlist) {
            res.status(200).json({ status: true, data: wishlist });
        } else {
            res.status(404).json({ message: "Wishlist Not Found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Get a wishlist by ID
// @route GET /api/wishlist/:id
// @access Public
export const getAWishlistById = expressAsyncHandler(async (req, res) => {
    try {
        const wishlist = await Wishlist.findById(req.params.id);
        if (wishlist) {
            res.status(200).json({ status: true, data: wishlist });
        } else {
            res.status(404).json({ message: "Wishlist Not Found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Update a wishlist
// @route PUT /api/wishlist/:id
// @access private
export const updateAWishlist = expressAsyncHandler(async (req, res) => {
    try {
        const wishlist = await Wishlist.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (wishlist) {
            res.status(200).json({ status: true, data: wishlist });
        } else {
            res.status(404).json({ message: "Wishlist Not Found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Delete a wishlist
// @route DELETE /api/wishlist/:id
// @access private
export const deleteAWishlist = expressAsyncHandler(async (req, res) => {
    try {
        const wishlist = await Wishlist.findByIdAndDelete(req.params.id);
        if (wishlist) {
            res.status(200).json({ status: true, message: "Wishlist Deleted Successfully!" });
        } else {
            res.status(404).json({ message: "Wishlist Not Found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
