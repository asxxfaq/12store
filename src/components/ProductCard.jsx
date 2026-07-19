import React from 'react';

const ProductCard = ({ product, onViewDetails, onEdit, onDelete, isAdmin }) => {
  return (
    <div style={styles.card}>
      <div style={styles.imageContainer} onClick={() => onViewDetails(product)}>
        <img 
          src={product.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"} 
          alt={product.name} 
          style={styles.image} 
        />
        <div style={styles.overlay}>
          <button className="btn-outline">View Details</button>
        </div>
      </div>
      
      <div className="product-info">
        <h3 className="product-name" onClick={() => onViewDetails(product)}>{product.name}</h3>
        <p className="product-details">{product.details}</p>
        <div className="product-price-container">
          {product.actualPrice && (
            <span className="product-actual-price">₹{parseFloat(product.actualPrice).toFixed(2)}</span>
          )}
          <span className="product-price">₹{parseFloat(product.price).toFixed(2)}</span>
        </div>
      </div>
      
      {isAdmin && (
        <div style={styles.actions}>
          <button className="btn-secondary" onClick={() => onEdit(product)}>Edit</button>
          <button className="btn-danger" onClick={() => onDelete(product.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'var(--surface-color)',
    border: '1px solid var(--border-color)',
    transition: 'var(--transition-smooth)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  imageContainer: {
    position: 'relative',
    paddingTop: '100%', /* 1:1 Aspect Ratio */
    overflow: 'hidden',
    cursor: 'pointer',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(253, 251, 247, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },

  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 1.5rem',
    borderTop: '1px solid var(--border-color)',
    backgroundColor: '#FAFAFA',
  }
};

export default ProductCard;
