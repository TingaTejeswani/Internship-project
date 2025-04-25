const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/inventoryDB');
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    supplier: String,
    sales: Number,
    price: Number,
    quantity: Number
});

module.exports = mongoose.model('Product', productSchema);
const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

router.post('/products', controller.createProduct);
router.get('/products', controller.getAllProducts);
router.get('/products/:id', controller.getProductById);
router.put('/products/:id', controller.updateProduct);
router.delete('/products/:id', controller.deleteProduct);

// Optional search
router.get('/search', controller.searchProduct);

module.exports = router;
