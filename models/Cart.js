const mongoose = require('mongoose');  

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    products: {
        type: Array,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    userAddress: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);