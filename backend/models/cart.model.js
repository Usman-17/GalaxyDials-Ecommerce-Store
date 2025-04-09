import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      //   required: true,
      min: [1, "Quantity cannot be less than 1"],
      default: 1,
    },

    price: {
      type: Number,
      //   required: true,
      min: [0, "Price cannot be negative"],
    },

    salePrice: {
      type: Number,
      min: [0, "Sale price cannot be negative"],
      validate: {
        validator: function (value) {
          return value <= this.price;
        },
        message: "Sale price should not exceed the original price",
      },
    },

    color: {
      type: String,
      //   required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Cart = mongoose.model("Cart", cartSchema);
