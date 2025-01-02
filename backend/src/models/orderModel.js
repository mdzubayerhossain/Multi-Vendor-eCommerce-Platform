import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },

    color: {
        type: String,
        required: true,
    },
    size: { 
        type : String,
        required: true,

    },
    quantity: {
        type : Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
},{_id: false,timeseries: true});

const cancellationSchema = new mongoose.Schema({
    reason: {
        type: String,
        required : true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
},
{_id:false}
);

const returnSchema = new mongoose.Schema({
    reason: {
        type: String,
        required : true,
    },
    status:{
        type: String,
        enum: ["panding","approved","rejected"],
        default:"pending"
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [orderItemSchema],
    totalPrice: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
        default: "pending",
    },
    address: {
        street: String,
        city: String,
        zip: String,
        state: String,
        country: String,
    },
    paymentMethod: {
        type: String,
        enum: ["card", "paypal", "cash_on_delivery"],
        required: true,
    },
    cancellation: cancellationSchema,
    return: returnSchema,
},{timeseries : true});

export const Order = mongoose.model("Order", orderSchema);
