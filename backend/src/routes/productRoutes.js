import express from "express";
import {
    createProduct,
    getAProductBySlug,
    getAllProducts,
    updateAProduct,
    deleteAProduct,
    getAProductById // Ensure this import
} from "../controllers/productController.js";
import { protect } from "../middlewares/authMiddleware.js";

const productRouter = express.Router();

productRouter.post("/", protect, createProduct);
productRouter.get("/all",getAllProducts);
productRouter.get("/:slug", getAProductBySlug);
productRouter.get("/:id", getAProductById); // Ensure this route
productRouter.put("/:id", protect, updateAProduct);
productRouter.delete("/:id", protect, deleteAProduct); // Ensure this route

export default productRouter;
