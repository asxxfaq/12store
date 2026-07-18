import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CustomerStore from './pages/CustomerStore';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './App.css'; 
import './index.css';

// Initial Dummy Data
const initialProducts = [
  {
    id: '1',
    name: 'Classic Oxford Shoes',
    price: '199.00',
    actualPrice: '299.00',
    category: 'shoes',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600',
    details: 'Premium leather oxford shoes perfect for formal occasions. Expertly crafted for comfort and durability.'
  },
  {
    id: '2',
    name: 'Leather Tote Bag',
    price: '249.50',
    actualPrice: '350.00',
    category: 'bags',
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=600',
    details: 'Spacious and elegant leather tote bag for everyday use. Features premium stitching and a timeless design.'
  },
  {
    id: '3',
    name: 'Chronograph Watch',
    price: '499.00',
    actualPrice: '799.00',
    category: 'watches',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=600',
    details: 'Luxury chronograph watch with a stainless steel strap. Water-resistant and meticulously calibrated.'
  },
  {
    id: '4',
    name: 'Aviator Sunglasses',
    price: '129.00',
    actualPrice: '189.00',
    category: 'specs',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600',
    details: 'Classic polarized aviator sunglasses with gold frame. Provides 100% UV protection and a sleek aesthetic.'
  }
];

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  
  // Modals state
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // CRUD Operations
  const handleSaveProduct = (productData) => {
    if (currentProduct) {
      setProducts(products.map(p => p.id === productData.id ? productData : p));
    } else {
      setProducts([productData, ...products]);
    }
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  // Modal Handlers
  const openAddModal = () => {
    setCurrentProduct(null);
    setIsAddEditModalOpen(true);
  };
  const openEditModal = (product) => {
    setCurrentProduct(product);
    setIsAddEditModalOpen(true);
  };
  const closeAddEditModal = () => setIsAddEditModalOpen(false);

  const openDetailsModal = (product) => {
    setCurrentProduct(product);
    setIsDetailsModalOpen(true);
  };
  const closeDetailsModal = () => setIsDetailsModalOpen(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Customer Route */}
          <Route path="/" element={
            <CustomerStore 
              products={products}
              currentProduct={currentProduct}
              isDetailsModalOpen={isDetailsModalOpen}
              openDetailsModal={openDetailsModal}
              closeDetailsModal={closeDetailsModal}
            />
          } />

          {/* Admin Login Route */}
          <Route path="/admin" element={
            isAdminAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin onLogin={setIsAdminAuthenticated} />
          } />

          {/* Admin Dashboard Route */}
          <Route path="/admin/dashboard" element={
            <AdminDashboard 
              isAuthenticated={isAdminAuthenticated}
              products={products}
              currentProduct={currentProduct}
              isDetailsModalOpen={isDetailsModalOpen}
              isAddEditModalOpen={isAddEditModalOpen}
              openDetailsModal={openDetailsModal}
              closeDetailsModal={closeDetailsModal}
              openAddModal={openAddModal}
              openEditModal={openEditModal}
              closeAddEditModal={closeAddEditModal}
              handleSaveProduct={handleSaveProduct}
              handleDeleteProduct={handleDeleteProduct}
            />
          } />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
