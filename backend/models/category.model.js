import mongoose from "mongoose";

var categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Name is required."],
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
