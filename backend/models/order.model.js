import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        color: { type: String, required: true },
        productImages: [
          {
            public_id: { type: String, required: true },
            url: { type: String, required: true },
          },
        ],
      },
    ],

    amount: {
      type: Number,
      required: true,
      min: [0, "Amount cannot be negative"],
    },

    address: {
      type: Object,
      required: true,
    },

    status: {
      type: String,
      default: "Order Placed",
    },

    paymentMethod: {
      type: String,
      require: true,
    },

    payment: {
      type: Boolean,
      require: true,
      default: false,
    },

    date: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
