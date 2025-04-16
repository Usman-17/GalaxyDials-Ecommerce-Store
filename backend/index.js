import express from "express";

import dbConnect from "./db/ConnectMongoDB.js";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import cron from "node-cron";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";
import enquiryRoutes from "./routes/enquiry.route.js";
import bannerRoutes from "./routes/banner.route.js";
import cartRoutes from "./routes/cart.route.js";
import orderRoutes from "./routes/order.route.js";
// imports End

const app = express();
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //to parse from data(urlencoded)
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:4000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

cron.schedule("0 0 1 * *", async () => {
  try {
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - 30);

    // Delete Cancelled orders
    const cancelledResult = await Order.deleteMany({
      status: "Cancelled",
      cancelledAt: { $lte: dateThreshold },
    });

    // Delete Delivered orders
    const deliveredResult = await Order.deleteMany({
      status: "Delivered",
      deliveredAt: { $lte: dateThreshold },
    });
  } catch (error) {
    console.error("Error in cron job deleting orders:", error);
  }
});

// Routes Setup
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/banner", bannerRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

// Running App
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  dbConnect();
});
