import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        _id: false, // Disables the `_id` field if you intended to use `__di: false`.
    }
);

const supportSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        message: [messageSchema], // Ensure `messageSchema` is defined or imported
        status: {
            type: String,
            enum: ["open", "in_progress", "closed"],
            default: "open",
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "low",
        },
        category: String,
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        assignedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        assignedBy: {
            type: Date,
            default: Date.now(),
        },
    },
    { timestamps: true } // Enables `createdAt` and `updatedAt` fields
);

supportSchema.pre("save", function (next){
    this.updatedAt = new Date();
    next();
})

export const Support = mongoose.model("Support", supportSchema);