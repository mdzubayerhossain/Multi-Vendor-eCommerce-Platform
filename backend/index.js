import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { errorHandler, notFoundErrorHandler } from "./src/middlewares/errorHandler.js"; // Ensure correct path
import userRouter from "./src/routes/userRoutes.js";
import vendorRoutes from "./src/routes/vendorRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import brandRoutes from "./src/routes/brandRoutes.js";
import categoryRouter from "./src/routes/categoryRoutes.js";
import subCategoryRouter from "./src/routes/subCategoryRoutes.js"; // Correct path for subcategory routes
import wishlistRouter from "./src/routes/wishlistRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

// MongoDB Connection Function
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in the environment variables");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

// Middleware Setup
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// API Routes
app.use("/api/user", userRouter);
app.use("/api/vendor", vendorRoutes);
app.use("/api/product", productRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/category", categoryRouter);
app.use("/api/subcategory", subCategoryRouter); // Subcategory route

// Not Found Error Handler
app.use(notFoundErrorHandler);

// General Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  connectDB(); // Connect to MongoDB
});
