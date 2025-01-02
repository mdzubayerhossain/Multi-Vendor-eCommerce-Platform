import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  slug:String,

}, {timeseries: true});


subcategorySchema.pre("save", function (next) {
    this.slug = slugify(this.name.toLowerCase(), { lower: true });
    next();
  });
export const subCategory= mongoose.model("subCategory", subcategorySchema)
