import dotenv from "dotenv";
import connectDB from "../database/index.js";
import { app } from "../src/app.js";

dotenv.config({ path: "./src/.env" });

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB connection failed!!!", error);
  });
