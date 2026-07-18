import React from 'react';
import Navbar from '../components/Navbar';
import CategorySection from '../components/CategorySection';
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
  
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const shoes = products.filter(p => p.category === 'shoes');
  const bags = products.filter(p => p.category === 'bags');
  const watches = products.filter(p => p.category === 'watches');
  const specs = products.filter(p => p.category === 'specs');

  return (
    <>
      <Navbar isAdmin={true} onAddClick={openAddModal} />
      
      <main>
        <div style={{padding: '3rem 0', backgroundColor: '#FAFAFA', borderBottom: '1px solid var(--border-color)'}}>
          <div className="container">
            <h1 style={{color: 'var(--accent-color)', fontFamily: 'var(--font-heading)'}}>Admin Dashboard</h1>
            <p style={{color: 'var(--text-secondary)'}}>Manage your product catalog</p>
          </div>
        </div>
        
        <CategorySection 
          id="shoes" 
          title="Shoes" 
          products={shoes} 
          onViewDetails={openDetailsModal}
          onEdit={openEditModal}
          onDelete={handleDeleteProduct}
          isAdmin={true}
        />
        <CategorySection 
          id="bags" 
          title="Bags" 
          products={bags} 
          onViewDetails={openDetailsModal}
          onEdit={openEditModal}
          onDelete={handleDeleteProduct}
          isAdmin={true}
        />
        <CategorySection 
          id="watches" 
          title="Watches" 
          products={watches} 
          onViewDetails={openDetailsModal}
          onEdit={openEditModal}
          onDelete={handleDeleteProduct}
          isAdmin={true}
        />
        <CategorySection 
          id="specs" 
          title="Specs" 
          products={specs} 
          onViewDetails={openDetailsModal}
          onEdit={openEditModal}
          onDelete={handleDeleteProduct}
          isAdmin={true}
        />
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
