import { Brand } from "../models/brandModel.js";
import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middlewares/errorHandler.js";

// @desc Create a new brand
// @route POST /api/brand/
// @access Private
export const createBrand = expressAsyncHandler(async (req, res) => {
    const { name, description = "", logo = "" } = req.body;

    // Validate required fields
    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    // Check if the brand name already exists
    const existingBrand = await Brand.findOne({ name });
    if (existingBrand) {
        return res.status(400).json({ message: "Brand already exists" });
    }

    // Create a new brand
    const brand = await Brand.create({
        name,
        description,
        logo,
    });

    if (brand) {
        res.status(201).json({ status: true, data: brand });
    } else {
        res.status(500).json({ message: "Failed to create brand" });
    }
});

// @desc Get all brands
// @route GET /api/brand/all
// @access Public
export const getAllBrands = expressAsyncHandler(async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(200).json({ status: true, data: brands });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Get a brand by slug
// @route GET /api/brand/:slug
// @access Public
export const getABrandBySlug = expressAsyncHandler(async (req, res) => {
    try {
        const brand = await Brand.findOne({ slug: req.params.slug });
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
export const getABrandById = expressAsyncHandler(async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
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
export const updateABrand = expressAsyncHandler(async (req, res) => {
    try {
        const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (brand) {
            res.status(200).json({ status: true, data: brand });
        } else {
            res.status(404).json({ message: "Brand Not Found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Delete a brand
// @route DELETE /api/brand/:id
// @access private
export const deleteABrand = expressAsyncHandler(async (req, res) => {
    try {
        const brand = await Brand.findByIdAndDelete(req.params.id);
        if (brand) {
            res.status(200).json({ status: true, message: "Brand Deleted Successfully!" });
        } else {
            res.status(404).json({ message: "Brand Not Found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
