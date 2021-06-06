const mongoose = require("mongoose");

const { Schema } = mongoose;

const cartItemSchema = new Schema(
  {
    is_active: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
    },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: "User",
      },
    ],
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;
