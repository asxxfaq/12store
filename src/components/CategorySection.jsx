import React from 'react';
import ProductCard from './ProductCard';

const CategorySection = ({ id, title, products, onViewDetails, onEdit, onDelete, isAdmin }) => {
  return (
    <section id={id} style={styles.section}>
      <div className="container">
        <h2 className="section-title">
          {title} <span className="gold-text">Collection</span>
        </h2>
        
        {products.length === 0 ? (
          <p style={styles.emptyText}>No products available in this collection yet.</p>
        ) : (
          <div style={styles.grid}>
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onViewDetails={onViewDetails}
                onEdit={onEdit}
                onDelete={onDelete}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '5rem 0',
    borderTop: '1px solid var(--border-color)',
    backgroundColor: 'var(--primary-color)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
  },
  emptyText: {
    textAlign: 'center',
    color: 'var(--text-secondary)',
    fontStyle: 'italic',
  }
};

export default CategorySection;
