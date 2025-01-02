import mongoose from "mongoose";
import slugify from "slugify";

// Define the category schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  slug: {
    type: String,
    unique: true,
  },
}, { timestamps: true });

// Pre-save hook to create a slug from the name
categorySchema.pre("save", function (next) {
    if (this.name) {
        this.slug = slugify(this.name.toLowerCase(), { lower: true });
    }
    next();
});

// Create the model for category
export const Category = mongoose.model("Category", categorySchema);
