import express from "express";
import {
    createSubCategory,
    getAllSubCategories,
    getASubCategoryBySlug,
    getASubCategoryById,
    updateASubCategory,
    deleteASubCategory,
} from "../controllers/subCategoryController.js"; // Ensure this is correctly imported

const subSubCategoryRouter = express.Router();

subSubCategoryRouter.post("/", createSubCategory);
subSubCategoryRouter.get("/all", getAllSubCategories);
subSubCategoryRouter.get("/:slug", getASubCategoryBySlug); // Correctly use the slug
subSubCategoryRouter.get("/:id", getASubCategoryById);
subSubCategoryRouter.put("/:id", updateASubCategory);
subSubCategoryRouter.delete("/:id", deleteASubCategory);

export default subSubCategoryRouter;
