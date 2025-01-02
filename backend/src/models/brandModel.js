import mongoose from "mongoose";
const brandSchema = new mongoose.Schema(
    {
        name: {
            type : String,
            required: true,
            unique: true,
        },
        slug:{
            type : String,
            unique : true
        },

        description: String,
        logo: String,
    },
    {timeseries: ture}
);

brandSchema.pre("save", function (next) {
    this.slug = slugify(this.name.toLowerCase(), { lower: true });
    next();
});
export const Brand = mongoose.model("Brand", brandSchema)