import express from "express";
import {
    createBrand,
    getABrandBySlug,
    getAllBrands,
    updateABrand,
    deleteABrand,
    getABrandById // Ensure this import
} from "../controllers/brandController.js";
import { protect } from "../middlewares/authMiddleware.js";

const brandRouter = express.Router();

brandRouter.post("/", protect, createBrand);
brandRouter.get("/all",getAllBrands);
brandRouter.get("/:slug", getABrandBySlug);
brandRouter.get("/:id", getABrandById); // Ensure this route
brandRouter.put("/:id", protect, updateABrand);
brandRouter.delete("/:id", protect, deleteABrand); // Ensure this route

export default brandRouter;
