const express = require("express");
const router = express.Router();
const Product = require("../model/Product");

router.post("/",(req,res) => {
    const doc = new Product({
        id : req.body.id,
        name : req.body.name,
        group : req.body.group,
        image : req.body.image
    })
    Product.saveProduct(doc,(err)=>{
        if (err) console.console.log(err);
        res.redirect("/");
    })
})

module.exports = router;