import mongoose from "mongoose";

var brandSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Brand Name is required."],
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Brand = mongoose.model("Brand", brandSchema);
