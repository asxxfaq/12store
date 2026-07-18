const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  actualPrice: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  details: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
