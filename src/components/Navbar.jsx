import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onAddClick, isAdmin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav style={styles.navbar}>
      <div className="container" style={styles.navContainer}>
        <div style={styles.logo}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img src="/logo.jpg" alt="12Store Logo" style={{ height: '40px', width: '40px', borderRadius: '50%', border: '2px solid var(--gold-color)' }} />
            <span>12storein</span>
          </Link>
        </div>
        
        <div className="menu-icon" onClick={toggleMenu}>
          <span style={{ transform: isMenuOpen ? 'rotate(-45deg) translate(-5px, 6px)' : 'none' }}></span>
          <span style={{ opacity: isMenuOpen ? 0 : 1 }}></span>
          <span style={{ transform: isMenuOpen ? 'rotate(45deg) translate(-5px, -6px)' : 'none' }}></span>
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#shoes" onClick={() => setIsMenuOpen(false)}>Shoes</a></li>
          <li><a href="#bags" onClick={() => setIsMenuOpen(false)}>Bags</a></li>
          <li><a href="#watches" onClick={() => setIsMenuOpen(false)}>Watches</a></li>
          <li><a href="#specs" onClick={() => setIsMenuOpen(false)}>Specs</a></li>
          <li className="mobile-only">
            {isAdmin ? (
              <button className="btn-outline" onClick={() => { onAddClick(); setIsMenuOpen(false); }}>
                Add Product
              </button>
            ) : (
              <Link to="/admin" onClick={() => setIsMenuOpen(false)} style={{fontSize: '0.9rem', color: 'var(--accent-color)', fontWeight: 'bold'}}>
                Admin Login
              </Link>
            )}
          </li>
        </ul>
        
        <div className="desktop-only">
          {isAdmin ? (
            <button className="btn-outline" onClick={onAddClick}>
              Add Product
            </button>
          ) : (
            <Link to="/admin" style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>
              Admin Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: 'rgba(253, 251, 247, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid var(--border-color)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    padding: '1rem 0'
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.5rem',
    fontWeight: '700',
    letterSpacing: '2px',
    color: 'var(--accent-color)'
  }
};

export default Navbar;
