const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 70
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 7,
        max: 70,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    img: {
        type: String
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);