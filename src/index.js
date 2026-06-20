// import dotenv from "dotenv";
// import connectDB from "./db/db.js";
// import { app } from "./app.js";

import "dotenv/config";

import connectDB from "./db/db.js";
import { app } from "./app.js";

// dotenv.config({
//   path:"./.env"
// });

const port = process.env.PORT || 8000;
console.log("Mongo URL:", process.env.MONGODB_URL);
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started at port ${port}`);
      
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed", error);
  });
