import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js"
import { seeInitalProduct } from "./services/productService.js";



const app = express();
const port = 3001;
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/ecommerce").then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});

// seed the products to database
seeInitalProduct();

app.use("/user", userRoute);
app.use("/product", productRoute)



app.listen(3001, () => {
    console.log("Server is running on port 3001");
});