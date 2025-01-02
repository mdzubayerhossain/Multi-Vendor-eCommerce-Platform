import expressAsyncHandler from 'express-async-handler';
import { AppError } from "../middlewares/errorHandler.js";
import { Product } from "../models/productModel.js";

// @desc Create a new Product
// @route POST /api/product/
// @access private
export const createProduct = expressAsyncHandler(async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json({ status: true, data: newProduct });
    } catch (error) {
        throw new AppError(error.message || "Failed to create product", 400);
    }
});

// @desc Get ALL Products
// @route GET /api/product/all
// @access Public
export const getAllProducts = expressAsyncHandler(async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ status: true, data: products });
    } catch (error) {
        throw new AppError(error.message || "Failed to retrieve products", 400);
    }
});

// @desc Get A Product By Slug
// @route GET /api/product/:slug
// @access Public
export const getAProductBySlug = expressAsyncHandler(async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug });
        if (!product) {
            throw new AppError("Product Not Found!", 404);
        }
        res.status(200).json({ status: true, data: product });
    } catch (error) {
        throw new AppError(error.message || "Failed to retrieve product", 400);
    }
});

// @desc Update A Product
// @route PUT /api/product/:id
// @access private
export const updateAProduct = expressAsyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!product) {
            throw new AppError("Product Not Found!", 404);
        }
        res.status(200).json({ status: true, data: product });
    } catch (error) {
        throw new AppError(error.message || "Failed to update product", 400);
    }
});

// @desc Delete A Product
// @route DELETE /api/product/:id
// @access private
export const deleteAProduct = expressAsyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            throw new AppError("Product Not Found!", 404);
        }
        res.status(200).json({ status: true, message: "Product Deleted Successfully!" });
    } catch (error) {
        throw new AppError(error.message || "Failed to delete product", 400);
    }
});
