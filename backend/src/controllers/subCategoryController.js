import expressAsyncHandler from "express-async-handler";
import { SubCategory } from "../models/subCategoryModel.js"; // Correct import based on default export
import { AppError } from "../middlewares/errorHandler.js";

// @desc Create a new subcategory
// @route POST /api/subcategory/
// @access private
export const createSubCategory = expressAsyncHandler(async (req, res) => {
    const { name, category } = req.body;

    // Check for missing required fields
    if (!name || !category) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const subCategory = await SubCategory.create({
            name,
            category,
        });

        res.status(201).json({ status: true, data: subCategory });
    } catch (error) {
        console.error("Error creating subcategory:", error); // Add debug log
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Get all subcategories
// @route GET /api/subcategory/
// @access Public
export const getAllSubCategories = expressAsyncHandler(async (req, res) => {
    try {
        const subCategories = await SubCategory.find();
        res.status(200).json({ status: true, data: subCategories });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
// @desc Get a wishlist by slug
// @route GET /api/wishlist/:slug
// @access Public
export const getASubCategoryBySlug = expressAsyncHandler(async (req, res) => {
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

// @desc Get a subcategory by ID
// @route GET /api/subcategory/:id
// @access Public
export const getASubCategoryById = expressAsyncHandler(async (req, res) => {
    try {
        const subCategory = await SubCategory.findById(req.params.id);
        if (subCategory) {
            res.status(200).json({ status: true, data: subCategory });
        } else {
            res.status(404).json({ message: "SubCategory Not Found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Update a subcategory
// @route PUT /api/subcategory/:id
// @access private
export const updateASubCategory = expressAsyncHandler(async (req, res) => {
    try {
        const subCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (subCategory) {
            res.status(200).json({ status: true, data: subCategory });
        } else {
            res.status(404).json({ message: "SubCategory Not Found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Delete a subcategory
// @route DELETE /api/subcategory/:id
// @access private
export const deleteASubCategory = expressAsyncHandler(async (req, res) => {
    try {
        const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
        if (subCategory) {
            res.status(200).json({ status: true, message: "SubCategory Deleted Successfully!" });
        } else {
            res.status(404).json({ message: "SubCategory Not Found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

