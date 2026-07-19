const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const Product = require('./models/Product');

const newProducts = [
  { id: 'p100', name: 'Premium Leather Tote', price: '2999', actualPrice: '4500', category: 'bags', image: '/images/BAG.jpg', details: 'A spacious and luxurious leather tote bag.' },
  { id: 'p101', name: 'Signature Handbag', price: '3499', actualPrice: '5000', category: 'bags', image: '/images/BAG1.jpg', details: 'Elegantly crafted signature handbag.' },
  { id: 'p102', name: 'Travel Duffle', price: '4199', actualPrice: '6200', category: 'bags', image: '/images/BAG2.jpg', details: 'Perfect companion for your weekend getaways.' },
  { id: 'p103', name: 'Classic Oxford Shoes', price: '1999', actualPrice: '3000', category: 'shoes', image: '/images/SHOE.jpg', details: 'Formal oxford shoes for the modern gentleman.' },
  { id: 'p104', name: 'Suede Loafers', price: '2299', actualPrice: '3500', category: 'shoes', image: '/images/SHOE1.jpg', details: 'Comfortable and stylish suede loafers.' },
  { id: 'p105', name: 'Aviator Sunglasses', price: '999', actualPrice: '1500', category: 'specs', image: '/images/SPECS.jpg', details: 'Classic aviator sunglasses with UV protection.' },
  { id: 'p106', name: 'Wayfarer Frames', price: '899', actualPrice: '1200', category: 'specs', image: '/images/SPECS1.jpg', details: 'Trendy wayfarer frames for everyday wear.' },
  { id: 'p107', name: 'Minimalist Watch', price: '3999', actualPrice: '5999', category: 'watches', image: '/images/WATCH.jpg', details: 'Elegant minimalist watch with a leather strap.' },
  { id: 'p108', name: 'Chronograph Timepiece', price: '5499', actualPrice: '8000', category: 'watches', image: '/images/WATCH1.jpg', details: 'Premium chronograph watch for men.' }
];

const seedDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/12thstore';
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');
    
    for (const p of newProducts) {
      await Product.findOneAndUpdate({ id: p.id }, p, { upsert: true, new: true });
    }
    
    console.log('Products seeded successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

seedDB();
