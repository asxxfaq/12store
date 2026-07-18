import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';
import ProductDetailsModal from '../components/ProductDetailsModal';

const CustomerStore = ({ products, currentProduct, isDetailsModalOpen, openDetailsModal, closeDetailsModal }) => {
  const shoes = products.filter(p => p.category === 'shoes');
  const bags = products.filter(p => p.category === 'bags');
  const watches = products.filter(p => p.category === 'watches');
  const specs = products.filter(p => p.category === 'specs');

  return (
    <>
      <Navbar isAdmin={false} />
      
      <main>
        <HeroSection />
        
        <CategorySection 
          id="shoes" 
          title="Shoes" 
          products={shoes} 
          onViewDetails={openDetailsModal}
          isAdmin={false}
        />
        <CategorySection 
          id="bags" 
          title="Bags" 
          products={bags} 
          onViewDetails={openDetailsModal}
          isAdmin={false}
        />
        <CategorySection 
          id="watches" 
          title="Watches" 
          products={watches} 
          onViewDetails={openDetailsModal}
          isAdmin={false}
        />
        <CategorySection 
          id="specs" 
          title="Specs" 
          products={specs} 
          onViewDetails={openDetailsModal}
          isAdmin={false}
        />
      </main>
      
      <footer style={styles.footer}>
        <div className="container" style={styles.footerContent}>
          <div style={styles.logo}>
            <span className="gold-text">12</span>STORE
          </div>
          <p style={styles.copyright}>&copy; {new Date().getFullYear()} 12Store.in. Crafted with elegance.</p>
        </div>
      </footer>

      <ProductDetailsModal 
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        product={currentProduct}
      />
    </>
  );
};

const styles = {
  footer: {
    backgroundColor: '#FDFBF7',
    padding: '3rem 0',
    borderTop: '1px solid var(--border-color)',
    marginTop: 'auto',
  },
  footerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  logo: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.5rem',
    fontWeight: '700',
    letterSpacing: '2px',
    color: 'var(--accent-color)'
  },
  copyright: {
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
  }
};

export default CustomerStore;
