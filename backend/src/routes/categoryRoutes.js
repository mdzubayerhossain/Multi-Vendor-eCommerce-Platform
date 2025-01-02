import express from "express";
import {
    createCategory,
    getACategoryBySlug,
    getAllCategorys,
    updateACategory,
    deleteACategory,
    getACategoryById // Ensure this import
} from "../controllers/categoryController.js";
import { protect } from "../middlewares/authMiddleware.js";

const categoryRouter = express.Router();

categoryRouter.post("/", protect, createCategory);
categoryRouter.get("/all",getAllCategorys);
categoryRouter.get("/:slug", getACategoryBySlug);
categoryRouter.get("/:id", getACategoryById); // Ensure this route
categoryRouter.put("/:id", protect, updateACategory);
categoryRouter.delete("/:id", protect, deleteACategory); // Ensure this route

export default categoryRouter;
