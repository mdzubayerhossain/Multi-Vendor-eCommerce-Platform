import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middlewares/errorHandler.js";
import { Category } from "../models/categoryModel.js"
// @desc Create a new category
// @route POST /api/category/
// @access private
export const createCategory= expressAsyncHandler(async (req,res) => {
    try{
        const newCategory = await Category.create(req.body);
        res.status(201).json({ status: true, data: newCategory});

    } catch(error){
        throw new AppError(error,400);
    }
})
// @desc Get all categorys
// @route GET /api/category/all
// @access Public
export const getAllCategorys = expressAsyncHandler(async (req, res) => {
    try {
        const categorys = await Category.find();
        res.status(200).json({ status: true, data: categorys });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Get a category by slug
// @route GET /api/category/:slug
// @access Public
export const getACategoryBySlug = expressAsyncHandler(async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug });
        if (category) {
            res.status(200).json({ status: true, data: category });
        } else {
            res.status(404).json({ message: "Category Not Found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Get a category by ID
// @route GET /api/category/:id
// @access Public
export const getACategoryById = expressAsyncHandler(async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            res.status(200).json({ status: true, data: category });
        } else {
            res.status(404).json({ message: "Category Not Found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Update a category
// @route PUT /api/category/:id
// @access private
export const updateACategory = expressAsyncHandler(async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (category) {
            res.status(200).json({ status: true, data: category });
        } else {
            res.status(404).json({ message: "Category Not Found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Delete a category
// @route DELETE /api/category/:id
// @access private
export const deleteACategory = expressAsyncHandler(async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (category) {
            res.status(200).json({ status: true, message: "Category Deleted Successfully!" });
        } else {
            res.status(404).json({ message: "Category Not Found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
