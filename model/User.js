const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        min: 6,
        type: String,
        max: 255,
    },
    password: {
        required: true,
        min: 6,
        type: String,
        max: 255,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('User',userSchema);