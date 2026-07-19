import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturedCollections from '../components/FeaturedCollections';
import LookbookSection from '../components/LookbookSection';
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
        <FeaturedCollections />
        <LookbookSection />
        
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
            <span className="gold-text">12</span><span style={{ color: '#fff' }}>STORE</span>
          </div>
          
          <div style={styles.orderingInfo}>
            <h4 style={styles.footerHeading}>How to Order</h4>
            <p style={styles.footerText}>Found something you love? Ordering is simple and personal.</p>
            <div style={styles.instaBox}>
              <span style={styles.instaIcon}>📸</span> 
              <span>Take a screenshot and <strong>DM us on Instagram</strong> to place your order!</span>
            </div>
            <a href="https://instagram.com/12store.in" target="_blank" rel="noopener noreferrer" style={styles.instaLink}>
              @12store.in
            </a>
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
    backgroundColor: 'var(--accent-color)',
    color: '#ffffff',
    padding: '4rem 0 2rem 0',
    marginTop: 'auto',
  },
  footerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
    textAlign: 'center'
  },
  logo: {
    fontFamily: 'var(--font-heading)',
    fontSize: '2rem',
    fontWeight: '700',
    letterSpacing: '2px',
  },
  orderingInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: '2rem',
    borderRadius: '4px',
    border: '1px solid rgba(212, 175, 55, 0.2)',
    maxWidth: '500px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center'
  },
  footerHeading: {
    color: 'var(--gold-color)',
    fontSize: '1.2rem',
    marginBottom: '0',
    letterSpacing: '1px'
  },
  footerText: {
    color: '#e0e0e0',
    fontSize: '0.95rem'
  },
  instaBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#ffffff',
    color: 'var(--accent-color)',
    padding: '12px 20px',
    borderRadius: '4px',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  instaIcon: {
    fontSize: '1.2rem'
  },
  instaLink: {
    color: 'var(--gold-color)',
    textDecoration: 'underline',
    fontWeight: '600',
    marginTop: '0.5rem',
    letterSpacing: '1px'
  },
  copyright: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '0.85rem',
    marginTop: '2rem',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    width: '100%',
    paddingTop: '2rem'
  }
};

export default CustomerStore;
