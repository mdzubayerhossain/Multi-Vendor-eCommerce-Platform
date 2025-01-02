import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { errorHandler, notFoundErrorHandler } from "./src/middlewares/errorHandler.js";
import userRouter from "./src/routes/userRoutes.js";
import vendorRoutes from "./src/routes/vendorRoutes.js";
import productRoutes from "./src/routes/productRoutes.js"; // Ensure this import is correct

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
app.use("/api/product", productRoutes); // Ensure this route is correct

// Not Found Error Handler
app.use(notFoundErrorHandler);

// General Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  connectDB(); // Connect to MongoDB
});
