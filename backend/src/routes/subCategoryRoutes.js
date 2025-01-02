import express from "express";
import {
    createSubCategory,
    getASubCategoryBySlug,
    getAllSubCategorys,
    updateASubCategory,
    deleteASubCategory,
    getASubCategoryById // Ensure this import
} from "../controllers/subSubCategoryController.js";
import { protect } from "../middlewares/authMiddleware.js";

const subSubCategoryRouter = express.Router();

subSubCategoryRouter.post("/", protect, createSubCategory);
subSubCategoryRouter.get("/all",getAllSubCategorys);
subSubCategoryRouter.get("/:slug", getASubCategoryBySlug);
subSubCategoryRouter.get("/:id", getASubCategoryById); // Ensure this route
subSubCategoryRouter.put("/:id", protect, updateASubCategory);
subSubCategoryRouter.delete("/:id", protect, deleteASubCategory); // Ensure this route

export default subSubCategoryRouter;
