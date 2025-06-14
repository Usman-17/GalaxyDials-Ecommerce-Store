import mongoose from "mongoose";

var enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },

    email: {
      type: String,
      required: [true, "Email is required."],
    },

    mobile: {
      type: String,
      required: [true, "Mobile number is required."],
      minlength: 11,
      maxlength: 11,
    },

    subject: {
      type: String,
      required: [true, "Subject is required."],
    },

    comment: {
      type: String,
      required: [true, "Comment is required."],
    },
  },
  { timestamps: true }
);

export const Enquiry = mongoose.model("Enquiry", enquirySchema);
