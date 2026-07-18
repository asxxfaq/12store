import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onAddClick, isAdmin }) => {
  return (
    <nav style={styles.navbar}>
      <div className="container" style={styles.navContainer}>
        <div style={styles.logo}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img src="/logo.jpg" alt="12Store Logo" style={{ height: '50px', width: '50px', borderRadius: '50%', border: '2px solid var(--gold-color)' }} />
            <span>12storein</span>
          </Link>
        </div>
        <ul style={styles.navLinks}>
          <li><a href="#shoes">Shoes</a></li>
          <li><a href="#bags">Bags</a></li>
          <li><a href="#watches">Watches</a></li>
          <li><a href="#specs">Specs</a></li>
        </ul>
        
        <div>
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
    fontSize: '2rem',
    fontWeight: '700',
    letterSpacing: '3px',
    color: 'var(--accent-color)'
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    gap: '2rem',
    textTransform: 'uppercase',
    fontSize: '0.9rem',
    letterSpacing: '1px',
    color: 'var(--text-primary)'
  }
};

export default Navbar;
