const express = require("express");
const router = express.Router();
const { Product } = require("../model/Product");

router.get("/getproduct/:id", async (req, res) => {
    try {
        const productData = await Product.findOne({ id: req.params.id });
        if (!productData) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(productData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error while fetching product." });
    }
});

module.exports = router;