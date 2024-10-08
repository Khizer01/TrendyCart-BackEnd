const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
    },
    category: {
        type: Array,
        required: true,
    },
    size: {
        type: Array,
    },
    color: {
        type: Array,
    },
    price: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);