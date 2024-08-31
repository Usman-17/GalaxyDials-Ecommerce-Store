import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/ConnectMongoDB.js";

const app = express();
dotenv.config();

// Running App
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  dbConnect();
});
