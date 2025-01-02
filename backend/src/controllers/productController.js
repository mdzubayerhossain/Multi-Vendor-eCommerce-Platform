import { Product } from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middlewares/errorHandler.js";

// @desc Create a new product
// @route POST /api/product/
// @access private
export const createProduct = expressAsyncHandler(async (req, res) => {
    const { name, description, vendor, category, subcategory, brand, image, variarions } = req.body;

    // Check for missing required fields
    if (!name || !vendor) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const product = await Product.create({
            name,
            description,
            vendor,
            category,
            subcategory,
            brand,
            image,
            variarions,
        });

        res.status(201).json({ status: true, data: product });
    } catch (error) {
        console.error("Error creating product:", error); // Add debug log
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Get all products
// @route GET /api/product/all
// @access Public
export const getAllProducts = expressAsyncHandler(async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ status: true, data: products });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Get a product by slug
// @route GET /api/product/:slug
// @access Public
export const getAProductBySlug = expressAsyncHandler(async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug });
        if (product) {
            res.status(200).json({ status: true, data: product });
        } else {
            res.status(404).json({ message: "Product Not Found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Get a product by ID
// @route GET /api/product/:id
// @access Public
export const getAProductById = expressAsyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.status(200).json({ status: true, data: product });
        } else {
            res.status(404).json({ message: "Product Not Found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Update a product
// @route PUT /api/product/:id
// @access private
export const updateAProduct = expressAsyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (product) {
            res.status(200).json({ status: true, data: product });
        } else {
            res.status(404).json({ message: "Product Not Found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Delete a product
// @route DELETE /api/product/:id
// @access private
export const deleteAProduct = expressAsyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (product) {
            res.status(200).json({ status: true, message: "Product Deleted Successfully!" });
        } else {
            res.status(404).json({ message: "Product Not Found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
