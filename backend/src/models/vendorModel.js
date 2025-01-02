import mongoose from "mongoose";
import bcrypt from "bcrypt";

const subscriptionSchema = new mongoose.Schema({
    plan: {
        type: String,
        enum: ["basic", "premium"],
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, { _id: false });

const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    storeName: {
        type: String,
        required: true,
        unique: true,
    },
    storeDescription: {
        type: String,
        required: true,
    },
    storeImage: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    storeBanner: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    subscription: subscriptionSchema,
}, { timestamps: true });

vendorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

vendorSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export const Vendor = mongoose.model("Vendor", vendorSchema);
