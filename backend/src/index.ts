import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js"
import { seeInitalProduct } from "./services/productService.js";
import cartRoute from "./routes/cartRoute.js";


dotenv.config();
const app = express();
const port = 3001;
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL || "").then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});

// seed the products to database
seeInitalProduct();

app.use("/user", userRoute);
app.use("/Product", productRoute)
app.use("/cart", cartRoute);



app.listen(3001, () => {
    console.log("Server is running on port 3001");
});