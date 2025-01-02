import { Vendor } from "../models/vendorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middlewares/errorHandler.js";

// @desc Create a new vendor
// @route POST /api/vendor/register
// @access Public
export const createVendor = expressAsyncHandler(async (req, res) => {
    const { name, email, password, username, storeName, storeDescription, storeImage, storeBanner, slug } = req.body;
    console.log("Request Body:", req.body);

    // Check for missing required fields
    if (!name || !email || !password || !storeName || !storeDescription || !storeImage || !storeBanner || !slug) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Check if the vendor already exists
        const vendorExists = await Vendor.findOne({ email });
        if (vendorExists) {
            return res.status(400).json({ message: "Vendor Already Exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create the vendor
        const vendor = await Vendor.create({
            name,
            email,
            password: hashedPassword, // Store the hashed password
            username,
            storeName,
            storeDescription,
            storeImage,
            storeBanner,
            slug,
            isVerified: false,
            subscription: {
                plan: "basic", // Default plan
                startDate: new Date(),
                endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Default end date
                isActive: true
            }
        });

        // If the vendor is created successfully, return the response
        if (vendor) {
            res.status(201).json({
                _id: vendor._id,
                name: vendor.name,
                email: vendor.email,
                role: vendor.role,
                token: generateToken(vendor._id), // Generate a token for the vendor
            });
        } else {
            res.status(400).json({ message: "Invalid vendor data" });
        }
    } catch (error) {
        // Handle any unexpected errors
        console.error("Server error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Get a vendor by ID
// @route GET /api/vendor/:id
// @access Private
export const getVendor = expressAsyncHandler(async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (vendor) {
            res.json(vendor);
        } else {
            res.status(404).json({ message: "Vendor Not Found!" });
        }
    } catch (error) {
        // Handle any unexpected errors
        console.error("Server error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Get a vendor by slug
// @route GET /api/vendor/slug/:slug
// @access Public
export const getVendorBySlug = expressAsyncHandler(async (req, res) => {
    try {
        const vendor = await Vendor.findOne({ slug: req.params.slug });
        if (vendor) {
            res.json(vendor);
        } else {
            res.status(404).json({ message: "Vendor Not Found!" });
        }
    } catch (error) {
        // Handle any unexpected errors
        console.error("Server error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Get all vendors
// @route GET /api/vendor/all
// @access Private
export const getAllVendors = expressAsyncHandler(async (req, res) => {
    try {
        const vendors = await Vendor.find();
        if (vendors.length > 0) {
            res.json(vendors);
        } else {
            res.status(404).json({ message: "No vendors found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Update a vendor
// @route PUT /api/vendor/:id
// @access Private
export const updateVendor = expressAsyncHandler(async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (vendor) {
            vendor.name = req.body.name || vendor.name;
            vendor.email = req.body.email || vendor.email;
            if (req.body.password) {
                vendor.password = await bcrypt.hash(req.body.password, 12);
            }
            vendor.storeName = req.body.storeName || vendor.storeName;
            vendor.storeDescription = req.body.storeDescription || vendor.storeDescription;
            vendor.storeImage = req.body.storeImage || vendor.storeImage;
            vendor.storeBanner = req.body.storeBanner || vendor.storeBanner;
            vendor.slug = req.body.slug || vendor.slug;

            const updatedVendor = await vendor.save();

            res.json(updatedVendor);
        } else {
            res.status(404).json({ message: "Vendor Not Found!" });
        }
    } catch (error) {
        // Handle any unexpected errors
        console.error("Server error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc Delete a vendor
// @route DELETE /api/vendor/:id
// @access Private
export const deleteVendor = expressAsyncHandler(async (req, res) => {
    try {
        await Vendor.findByIdAndDelete(req.params.id);
        res.json({ message: "Vendor Removed!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Helper function to generate a JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
