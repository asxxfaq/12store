import React, { useState, useEffect } from 'react';

const AddProductModal = ({ isOpen, onClose, onSaveProduct, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    actualPrice: '',
    category: 'shoes',
    image: '',
    details: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        price: '',
        actualPrice: '',
        category: 'shoes',
        image: '',
        details: ''
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) return;
    
    const productToSave = {
      ...formData,
      id: initialData ? initialData.id : Date.now().toString()
    };
    
    onSaveProduct(productToSave);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '2rem' }}>
          {initialData ? 'Edit' : 'Add'} <span className="gold-text">Product</span>
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input 
              type="text" 
              name="name" 
              className="form-control" 
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Royal Oak Watch"
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Price (₹)</label>
            <input 
              type="number" 
              name="price" 
              className="form-control" 
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 299.99"
              step="0.01"
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Actual Price (₹)</label>
            <input 
              type="number" 
              name="actualPrice" 
              className="form-control" 
              value={formData.actualPrice}
              onChange={handleChange}
              placeholder="e.g. 399.99"
              step="0.01"
            />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <select 
              name="category" 
              className="form-control" 
              value={formData.category}
              onChange={handleChange}
            >
              <option value="shoes">Shoes</option>
              <option value="bags">Bags</option>
              <option value="watches">Watches</option>
              <option value="specs">Specs</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Product Image</label>
            <input 
              type="file" 
              accept="image/*"
              className="form-control" 
              onChange={handleImageUpload}
              style={{ padding: '9px' }}
            />
            {formData.image && (
              <div style={{marginTop: '10px'}}>
                <img src={formData.image} alt="Preview" style={{maxWidth: '100%', maxHeight: '100px', objectFit: 'contain', borderRadius: '4px', border: '1px solid var(--border-color)'}} />
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label>Product Details</label>
            <textarea 
              name="details" 
              className="form-control" 
              value={formData.details}
              onChange={handleChange}
              placeholder="Enter product description and specifications..."
            />
          </div>
          
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            {initialData ? 'Update Product' : 'Save Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
