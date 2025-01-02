import express from "express";
import {
    createProduct,
    getAProductBySlug,
    getAllProducts,
    updateAProduct,
    deleteAProduct,
} from "../controllers/productController.js";
import { protect } from "../middlewares/authMiddleware.js";

const productRouter = express.Router();

productRouter.post("/", protect, createProduct);
productRouter.get("/:slug", getAProductBySlug);
productRouter.get("/all", protect, getAllProducts);
productRouter.put("/:id", protect, updateAProduct);
productRouter.delete("/:id", protect, deleteAProduct);

export default productRouter;
