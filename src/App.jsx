import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CustomerStore from './pages/CustomerStore';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './App.css'; 
import './index.css';

function App() {
  const [products, setProducts] = useState([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modals state
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Fetch Products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // CRUD Operations
  const handleSaveProduct = async (productData) => {
    try {
      const isEdit = !!currentProduct;
      const url = isEdit ? `/api/products/${productData.id}` : '/api/products';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      if (res.ok) {
        const savedProduct = await res.json();
        if (isEdit) {
          setProducts(products.map(p => p.id === savedProduct.id ? savedProduct : p));
        } else {
          setProducts([savedProduct, ...products]);
        }
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetch(`/api/products/${productId}`, {
          method: 'DELETE'
        });
        
        if (res.ok) {
          setProducts(products.filter(p => p.id !== productId));
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
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

  if (isLoading) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--primary-color)'}}>
        <h2 style={{color: 'var(--accent-color)', fontFamily: 'var(--font-heading)'}}>Loading...</h2>
      </div>
    );
  }

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
