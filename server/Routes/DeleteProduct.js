const express = require("express");
const router = express.Router();
const { deleteProduct } = require('../model/Product');

router.delete("/deleteproduct/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const deleteResult = await deleteProduct(productId);
        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully", result: deleteResult });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการลบข้อมูล" });
    }
});

module.exports = router;