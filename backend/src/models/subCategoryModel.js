import mongoose from "mongoose";
import slugify from "slugify"; // Import slugify for slug generation

// Define the category schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  slug: String,
}, { timestamps: true }); // Corrected from 'timeseries' to 'timestamps'

// Define the subcategory schema
const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Ensure this links to the Category model
    required: true,
  },
  description: String,
  slug: {
    type: String,
    unique: true,
  },
}, { timestamps: true });

// Pre-save hook to create a slug from the name
subcategorySchema.pre("save", function (next) {
    if (this.name) {
        this.slug = slugify(this.name.toLowerCase(), { lower: true });
    }
    next();
});

// Create the model for subcategory
export const SubCategory = mongoose.model("SubCategory", subcategorySchema);
