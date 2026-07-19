import React from 'react';
import bag1Img from '../assets/images/BAG1.jpg';
import bag2Img from '../assets/images/BAG2.jpg';
import shoe1Img from '../assets/images/SHOE1.jpg';
import specs1Img from '../assets/images/SPECS1.jpg';
import watch1Img from '../assets/images/WATCH1.jpg';

const LookbookSection = () => {
  return (
    <section className="lookbook-section">
      <div className="container">
        <h2 className="section-title" style={{ marginBottom: '4rem' }}>
          Trending <span className="gold-text">Now</span>
        </h2>
        
        <div className="lookbook-grid">
          {/* Main Large Item on Left */}
          <div className="lookbook-main">
            <div className="lookbook-item">
              <div className="lookbook-image" style={{ backgroundImage: `url(${bag1Img})` }}></div>
              <div className="lookbook-overlay">
                <h3 className="lookbook-title">The Signature Collection</h3>
                <span className="lookbook-action">Shop Premium Bags</span>
              </div>
            </div>
          </div>
          
          {/* 2x2 Sub-grid on Right */}
          <div className="lookbook-sub-grid">
            <div className="lookbook-item">
              <div className="lookbook-image" style={{ backgroundImage: `url(${watch1Img})` }}></div>
              <div className="lookbook-overlay">
                <h3 className="lookbook-title">Luxury Timepieces</h3>
              </div>
            </div>
            
            <div className="lookbook-item">
              <div className="lookbook-image" style={{ backgroundImage: `url(${shoe1Img})` }}></div>
              <div className="lookbook-overlay">
                <h3 className="lookbook-title">Men's Exclusives</h3>
              </div>
            </div>
            
            <div className="lookbook-item">
              <div className="lookbook-image" style={{ backgroundImage: `url(${specs1Img})` }}></div>
              <div className="lookbook-overlay">
                <h3 className="lookbook-title">Modern Eyewear</h3>
              </div>
            </div>
            
            <div className="lookbook-item">
              <div className="lookbook-image" style={{ backgroundImage: `url(${bag2Img})` }}></div>
              <div className="lookbook-overlay">
                <h3 className="lookbook-title">Travel Essentials</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LookbookSection;
