import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  slug:String,
  subCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategory",
    },
  ],
}, {timeseries: true});

categorySchema.pre("save", function (next) {
  this.slug = slugify(this.name.toLowerCase(), { lower: true });
  next();
});
export const Category= mongoose.model("Category", categorySchema)
