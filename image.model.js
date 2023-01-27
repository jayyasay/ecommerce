const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    itemName: {
      type: String,
    },
    itemDesc: {
      type: String,
    },
    itemQuantity: {
      type: Number,
    },
    itemImage: {
        data: Buffer,
        contentType: String
    }
  });

  module.exports = ImageModel = mongoose.model("Products", ProductSchema)