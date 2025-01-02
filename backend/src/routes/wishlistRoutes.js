import express from "express";
import {
    createWishlist,
    getAWishlistBySlug,
    getAllWishlists,
    updateAWishlist,
    deleteAWishlist,
    getAWishlistById // Ensure this import
} from "../controllers/wishlistController.js";
import { protect } from "../middlewares/authMiddleware.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/", protect, createWishlist);
wishlistRouter.get("/all",getAllWishlists);
wishlistRouter.get("/:slug", getAWishlistBySlug);
wishlistRouter.get("/:id", getAWishlistById); // Ensure this route
wishlistRouter.put("/:id", protect, updateAWishlist);
wishlistRouter.delete("/:id", protect, deleteAWishlist); // Ensure this route

export default wishlistRouter;
