import express from "express";
import productModel from "../models/productModel.js";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Create Product
router.post("/", async (req, res) => {
    try {
        const { title, image, price, stock } = req.body;

        const product = await productModel.create({
            title,
            image,
            price,
            stock,
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update Product
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, image, price, stock } = req.body;

        const product = await productModel.findByIdAndUpdate(
            id,
            {
                title,
                image,
                price,
                stock,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});

// Delete Product
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const product = await productModel.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json({
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});

export default router;