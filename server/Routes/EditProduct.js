const express = require("express");
const router = express.Router();
const { Product } = require("../model/Product");

router.put("/editproduct/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { id: req.params.id }, 
            req.body,              
            { new: true }          
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updatedProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล" });
    }
});

module.exports = router;