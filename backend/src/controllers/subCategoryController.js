import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middlewares/errorHandler.js";
import { SubCategory } from "../models/subCategoryModel.js"
// @desc Create a new subcategory
// @route POST /api/subcategory/
// @access private
export const createSubCategory= expressAsyncHandler(async (req,res) => {
    try{
        const newSubCategory = await SubCategory.create(req.body);
        res.status(201).json({ status: true, data: newSubCategory});

    } catch(error){
        throw new AppError(error,400);
    }
})
// @desc Get all subcategorys
// @route GET /api/subcategory/all
// @access Public
export const getAllSubCategorys = expressAsyncHandler(async (req, res) => {
    try {
        const subcategorys = await SubCategory.find();
        res.status(200).json({ status: true, data: subcategorys });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Get a subcategory by slug
// @route GET /api/subcategory/:slug
// @access Public
export const getASubCategoryBySlug = expressAsyncHandler(async (req, res) => {
    try {
        const subcategory = await SubCategory.findOne({ slug: req.params.slug });
        if (subcategory) {
            res.status(200).json({ status: true, data: subcategory });
        } else {
            res.status(404).json({ message: "SubCategory Not Found!" });
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
        const subcategory = await SubCategory.findById(req.params.id);
        if (subcategory) {
            res.status(200).json({ status: true, data: subcategory });
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
        const subcategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (subcategory) {
            res.status(200).json({ status: true, data: subcategory });
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
        const subcategory = await SubCategory.findByIdAndDelete(req.params.id);
        if (subcategory) {
            res.status(200).json({ status: true, message: "SubCategory Deleted Successfully!" });
        } else {
            res.status(404).json({ message: "SubCategory Not Found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
