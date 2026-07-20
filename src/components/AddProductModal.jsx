import React, { useState, useEffect } from 'react';

const AddProductModal = ({ isOpen, onClose, onSaveProduct, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    actualPrice: '',
    category: 'shoes',
    image: '',
    images: [],
    details: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData, images: initialData.images || [] });
    } else {
      setFormData({
        name: '',
        price: '',
        actualPrice: '',
        category: 'shoes',
        image: '',
        images: [],
        details: ''
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    if (files.length > 0) {
      const compressImage = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              let width = img.width;
              let height = img.height;
              const max_size = 800;

              if (width > height) {
                if (width > max_size) {
                  height *= max_size / width;
                  width = max_size;
                }
              } else {
                if (height > max_size) {
                  width *= max_size / height;
                  height = max_size;
                }
              }
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0, width, height);
              const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
              resolve(dataUrl);
            };
            img.onerror = reject;
            img.src = event.target.result;
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };

      try {
        const base64Images = await Promise.all(files.map(compressImage));
        setFormData(prev => ({ 
          ...prev, 
          images: base64Images,
          image: base64Images[0] 
        }));
      } catch (error) {
        console.error("Error compressing files:", error);
      }
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
            <label>Product Images (Up to 3)</label>
            <input 
              type="file" 
              accept="image/*"
              multiple
              className="form-control" 
              onChange={handleImageUpload}
              style={{ padding: '9px' }}
            />
            <div style={{marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
              {formData.images && formData.images.length > 0 ? (
                formData.images.map((imgSrc, idx) => (
                  <img key={idx} src={imgSrc} alt={`Preview ${idx + 1}`} style={{maxWidth: '100px', maxHeight: '100px', objectFit: 'contain', borderRadius: '4px', border: '1px solid var(--border-color)'}} />
                ))
              ) : formData.image && (
                <img src={formData.image} alt="Preview" style={{maxWidth: '100%', maxHeight: '100px', objectFit: 'contain', borderRadius: '4px', border: '1px solid var(--border-color)'}} />
              )}
            </div>
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
