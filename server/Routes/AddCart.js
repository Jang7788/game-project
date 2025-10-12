const express = require("express");
const router = express.Router();
const Cart = require("../model/Cart");

const checkAuth = (req, res, next) => {
    if (!req.session.user || !req.session.user._id) {
        return res.status(401).json({ message: "กรุณาเข้าสู่ระบบเพื่อใช้งานตะกร้าสินค้า" });
    }
    next();
};

router.use(checkAuth);

router.post("/addcart", async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.session.user._id;

    if (!productId || !quantity || quantity < 1) {
        return res.status(400).json({ message: "ข้อมูลสินค้าหรือจำนวนไม่ถูกต้อง" });
    }

    try {
        let cart = await Cart.findOne({ userId: userId });

        if (!cart) {
            cart = new Cart({ userId: userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
        } else {
            cart.items.push({ productId, quantity });
        }
        const savedCart = await cart.save();
        res.status(201).json(savedCart);

    } catch (err) {
        console.error("Error adding to cart:", err);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการเพิ่มสินค้าลงตะกร้า" });
    }
});

module.exports = router;