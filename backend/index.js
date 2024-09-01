import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import dbConnect from "./db/ConnectMongoDB.js";

import authRoutes from "./routes/auth.route.js";
// imports End

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //to parse from data(urlencoded)
app.use(cookieParser());

// Routes Setup
app.use("/api/auth", authRoutes);

// Running App
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  dbConnect();
});
