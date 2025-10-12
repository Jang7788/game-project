const express = require("express");
const router = express.Router();
const Cart = require("../model/Cart");
const { Product } = require("../model/Product");

router.get("/cart", async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "กรุณาเข้าสู่ระบบ" });
    }

    try {
        const userId = req.session.user._id; 

        const userCart = await Cart.findOne({ userId: userId })
            .populate({
                path: 'items.productId', 
                model: Product,          
                select: 'name price image stock'
            });

        if (!userCart) {
            return res.json({ items: [] }); 
        }
        
        res.json(userCart);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
    }
});

module.exports = router;