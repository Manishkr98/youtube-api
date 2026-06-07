import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT

app.get("/", (req, res) => {
  res.send("Application is running...");
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started at port ${port}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed", error);
  });