const express = require("express");
const router = express.Router();
const { Product } = require("../model/Product");
const multer = require('multer'); 
const path = require('path');     

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post("/addproduct", upload.single('image'), async (req, res) => { 
  try {
    const newProduct = new Product({
      id: req.body.id,
      name: req.body.name,
      group: req.body.group,
      image: req.file ? req.file.path : '',
      description: req.body.description ,
      stock:req.body.stock,
      price:req.body.price
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);

  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" });
  }
});

module.exports = router;