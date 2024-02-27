import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const port = process.env.PORT || 4500;
const app = express();
// Middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("The database was connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

// Test API
app.get("/", (req, res) => {
  res.send("<h1> <center> UNIC SOL! </center> </h1>");
});

// API routes v1
app.use("/api/user", userRouter);

// Server creation
app.listen(port, () => {
  console.log(`Server connected to the port ${port}`);
});
