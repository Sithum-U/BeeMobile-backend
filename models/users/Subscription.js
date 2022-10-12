const mongoose = require("mongoose")

const subscriptionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
}, { timestamps: true });

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
