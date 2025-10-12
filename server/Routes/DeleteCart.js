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

router.delete("/items/:productId", async (req, res) => {
    const { productId } = req.params;
    const userId = req.session.user._id;

    if (!productId) {
        return res.status(400).json({ message: "ไม่ได้ระบุ ID ของสินค้าที่จะลบ" });
    }

    try {
        const updatedCart = await Cart.findOneAndUpdate(
            { userId: userId }, 
            { 
                $pull: { 
                    items: { productId: productId } 
                } 
            },
            { new: true } 
        );

        if (!updatedCart) {
            return res.status(404).json({ message: "ไม่พบตะกร้าสินค้า" });
        }

        res.status(200).json({ message: "ลบสินค้าออกจากตะกร้าแล้ว", cart: updatedCart });
    } catch (err) {
        console.error("Error removing item from cart:", err);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการลบสินค้า" });
    }
});

module.exports = router;