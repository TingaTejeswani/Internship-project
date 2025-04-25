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
const Product = require('../models/Product');

// Create product
exports.createProduct = async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
};

// Read all products
exports.getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

// Read single product
exports.getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
};

// Update product
exports.updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
};

// Delete product
exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
};

// Optional: Search by name
exports.searchProduct = async (req, res) => {
    const name = req.query.name;
    const result = await Product.find({ name: { $regex: name, $options: 'i' } });
    res.json(result);
};
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

module.exports = router;const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', productRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(Server running on port ${PORT}));
