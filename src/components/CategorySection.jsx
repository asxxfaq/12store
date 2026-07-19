import React, { useState } from 'react';
import ProductCard from './ProductCard';

const CategorySection = ({ id, title, products, onViewDetails, onEdit, onDelete, isAdmin }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Optional: scroll to top of section
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id={id} style={styles.section}>
      <div className="container">
        <h2 className="section-title">
          {title} <span className="gold-text">Collection</span>
        </h2>
        
        {products.length === 0 ? (
          <p style={styles.emptyText}>No products available in this collection yet.</p>
        ) : (
          <>
            <div className="product-grid">
              {currentProducts.map(product => (
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
            
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)} 
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  Prev
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button 
                  onClick={() => handlePageChange(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  Next
                </button>
              </div>
            )}
          </>
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
  emptyText: {
    textAlign: 'center',
    color: 'var(--text-secondary)',
    fontStyle: 'italic',
  }
};

export default CategorySection;
