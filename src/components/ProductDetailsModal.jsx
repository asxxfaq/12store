import React from 'react';

const ProductDetailsModal = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  const handleBuyClick = () => {
    // Redirect to Instagram DM
    const message = encodeURIComponent(`Hi, I'm interested in buying the ${product.name} for ₹${product.price}.`);
    window.open(`https://ig.me/m/12store.in?text=${message}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div style={styles.container}>
          <div style={styles.imageCol}>
            <img 
              src={product.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"} 
              alt={product.name} 
              style={styles.image} 
            />
          </div>
          
          <div style={styles.infoCol}>
            <p style={styles.category}>{product.category}</p>
            <h2 style={styles.title}>{product.name}</h2>
            <div style={styles.priceContainer}>
              {product.actualPrice && (
                <span style={styles.actualPrice}>₹{parseFloat(product.actualPrice).toFixed(2)}</span>
              )}
              <span style={styles.price}>₹{parseFloat(product.price).toFixed(2)}</span>
            </div>
            
            <div style={styles.divider}></div>
            
            <h4 style={{fontFamily: 'var(--font-heading)', marginBottom: '0.5rem'}}>Product Details</h4>
            <p style={styles.details}>{product.details || "No details available for this product."}</p>
            
            <button className="btn-primary" style={{marginTop: '2rem', width: '100%'}} onClick={handleBuyClick}>
              Buy on Instagram
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  imageCol: {
    flex: '1 1 300px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  infoCol: {
    flex: '1 1 300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  category: {
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: 'var(--text-secondary)',
    fontSize: '0.85rem',
    marginBottom: '0.5rem',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: 'var(--accent-color)',
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  price: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: 'var(--gold-color)',
  },
  actualPrice: {
    fontSize: '1.2rem',
    color: 'var(--text-secondary)',
    textDecoration: 'line-through',
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--border-color)',
    margin: '1.5rem 0',
  },
  details: {
    color: 'var(--text-secondary)',
    lineHeight: '1.8',
  }
};

export default ProductDetailsModal;
