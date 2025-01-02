import mongoose from "mongoose";
import slugify from "slugify"; // Ensure slugify is imported

const brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            unique: true,
        },
        description: String,
        logo: String,
    },
    { timestamps: true } // Corrected the typo here
);

brandSchema.pre("save", function (next) {
    this.slug = slugify(this.name.toLowerCase(), { lower: true });
    next();
});

export const Brand = mongoose.model("Brand", brandSchema);
