const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    is_active: {
        type: Boolean,
        default: true,
    },
    name: {
        type: String,
        required: [true, "Please include the product name"],
      },
    price: {
      type: Number,
      required: [true, "Please include the product price"],
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
