import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import AddProductModal from '../components/AddProductModal';
import ProductDetailsModal from '../components/ProductDetailsModal';
import { Navigate } from 'react-router-dom';

const AdminDashboard = ({ 
  isAuthenticated,
  products, 
  currentProduct, 
  isDetailsModalOpen, 
  isAddEditModalOpen,
  openDetailsModal, 
  closeDetailsModal,
  openAddModal,
  openEditModal,
  closeAddEditModal,
  handleSaveProduct,
  handleDeleteProduct
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar isAdmin={true} onAddClick={openAddModal} />
      
      <main>
        <div style={{padding: '3rem 0', backgroundColor: '#FAFAFA', borderBottom: '1px solid var(--border-color)'}}>
          <div className="container">
            <h1 style={{color: 'var(--accent-color)', fontFamily: 'var(--font-heading)'}}>Admin Dashboard</h1>
            <p style={{color: 'var(--text-secondary)'}}>Manage your product catalog ({products.length} total products)</p>
          </div>
        </div>
        
        <section style={{ padding: '5rem 0', backgroundColor: 'var(--primary-color)' }}>
          <div className="container">
            {products.length === 0 ? (
              <p style={{textAlign: 'center', color: 'var(--text-secondary)', fontStyle: 'italic'}}>No products available in the catalog yet.</p>
            ) : (
              <>
                <div className="product-grid">
                  {currentProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onViewDetails={openDetailsModal}
                      onEdit={openEditModal}
                      onDelete={handleDeleteProduct}
                      isAdmin={true}
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
      </main>

      <AddProductModal 
        isOpen={isAddEditModalOpen} 
        onClose={closeAddEditModal} 
        onSaveProduct={handleSaveProduct}
        initialData={currentProduct}
      />
      
      <ProductDetailsModal 
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        product={currentProduct}
      />
    </>
  );
};

export default AdminDashboard;
