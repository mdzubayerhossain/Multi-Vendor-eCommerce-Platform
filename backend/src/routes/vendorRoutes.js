import express from "express";
import {
    createVendor,
    getVendor,
    getVendorBySlug,
    updateVendor,
    deleteVendor,
    getAllVendors // Add this import
} from "../controllers/vendorController.js";
import { protect } from "../middlewares/authMiddleware.js";

const vendorRouter = express.Router();

vendorRouter.post("/register", createVendor);
vendorRouter.get("/all", protect, getAllVendors); // Move this route before the /:id route
vendorRouter.get("/:id", protect, getVendor);
vendorRouter.get("/slug/:slug", getVendorBySlug);
vendorRouter.put("/:id", protect, updateVendor);
vendorRouter.delete("/:id", protect, deleteVendor);

export default vendorRouter;
