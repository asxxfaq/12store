const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Serverless Database Connection Logic
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/12thstore';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000 // Increased timeout for Vercel cold starts
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Apply connection check middleware to all API routes
app.use('/api', async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
});

// API Routes

// Get all products (lightweight for lists)
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().select('-image -images -details').sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single product (with full details and all images)
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Serve primary image as a streamable file
app.get('/api/products/:id/image', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id }).select('image images');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    const base64Str = product.image || (product.images && product.images.length > 0 ? product.images[0] : null);
    
    if (!base64Str) {
      return res.redirect('https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80');
    }

    const matches = base64Str.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches && matches.length === 3) {
      const type = matches[1];
      const buffer = Buffer.from(matches[2], 'base64');
      res.writeHead(200, {
        'Content-Type': `image/${type}`,
        'Content-Length': buffer.length,
        'Cache-Control': 'public, max-age=86400'
      });
      res.end(buffer);
    } else {
      res.status(500).json({ message: 'Invalid image format' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new product
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a product
app.put('/api/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id: req.params.id }, 
      req.body, 
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({ id: req.params.id });
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
