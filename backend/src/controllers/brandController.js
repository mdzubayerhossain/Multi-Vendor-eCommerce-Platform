import { Brand } from "../models/brandModel.js";

import { AppError } from "../middlewares/errorHandler.js";
import { Brand } from "../models/brandModel.js"
// @desc Create a new brand
// @route POST /api/brand/
// @access private
export const createBrand = expressAsyncHandler(async (req, res) => {
    const { name, description, vendor, category, subcategory, brand, image, variarions } = req.body;

    // Check for missing required fields
    if (!name || !vendor) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const Brand = await Brand.create({
            name,
            description,
            vendor,
            category,
            subcategory,
            brand,
            image,
            variarions,
        });

        res.status(201).json({ status: true, data: Brand });
    } catch (error) {
        console.error("Error creating Brand:", error); // Add debug log
        res.status(500).json({ message: "Server error", error: error.message });
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
