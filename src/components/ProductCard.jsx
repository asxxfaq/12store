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
      
      <div style={styles.info}>
        <h3 style={styles.name} onClick={() => onViewDetails(product)}>{product.name}</h3>
        <p style={styles.details}>{product.details}</p>
        <div style={styles.priceContainer}>
          {product.actualPrice && (
            <span style={styles.actualPrice}>₹{parseFloat(product.actualPrice).toFixed(2)}</span>
          )}
          <span style={styles.price}>₹{parseFloat(product.price).toFixed(2)}</span>
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
  info: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  name: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    fontFamily: 'var(--font-heading)',
    cursor: 'pointer',
    color: 'var(--accent-color)',
  },
  details: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    marginBottom: '1rem',
    flexGrow: 1,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: 'var(--gold-color)',
  },
  actualPrice: {
    fontSize: '1rem',
    color: 'var(--text-secondary)',
    textDecoration: 'line-through',
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
