import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";



const app = express();

app.use(express.json());
const port = 3001;

mongoose.connect("mongodb://localhost:27017/ecommerce").then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});

app.use("/user", userRoute);



app.listen(3001, () => {
    console.log("Server is running on port 3001");
});