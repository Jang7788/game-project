const mongoose = require("mongoose");
const ProductConn = mongoose.createConnection("mongodb://127.0.0.1:27017/Productdb");

const ProductSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String, required: true },
    group: { type: String },
    image: { type: String },     
    description: { type: String },
}, { timestamps: true });

const Product = ProductConn.model("Product", ProductSchema);

module.exports.saveProduct = async function(data) {
    try {
        const product = new Product(data);   
        const saved = await product.save();   
        return saved;
    } catch (err) {
        throw err;
    }
};

module.exports.Product = Product;
