const express = require("express");
const router = express.Router();
const { Product } = require("../model/Product");

router.get("/allproduct", async (req, res) => {
    try {
        const allProducts = await Product.find();
        res.json(allProducts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error while fetching products." });
    }
});

module.exports = router;