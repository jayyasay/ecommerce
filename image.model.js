const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    itemDesc: {
        type: String,
        required: true,
    },
    itemQuantity: {
        type: Number,
        required: true,
    },
    itemImage: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model("Products", ProductSchema)