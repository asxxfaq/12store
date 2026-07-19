import React from 'react';
import bagImg from '../assets/images/BAG.jpg';
import shoeImg from '../assets/images/SHOE.jpg';
import watchImg from '../assets/images/WATCH.jpg';
import specsImg from '../assets/images/SPECS.jpg';

const collections = [
  {
    id: 'bags',
    title: 'Luxury Bags',
    image: bagImg,
    link: '#bags'
  },
  {
    id: 'shoes',
    title: "Unisex Footwear",
    image: shoeImg,
    link: '#shoes'
  },
  {
    id: 'watches',
    title: 'Timeless Watches',
    image: watchImg,
    link: '#watches'
  },
  {
    id: 'specs',
    title: 'Designer Eyewear',
    image: specsImg,
    link: '#specs'
  }
];

const FeaturedCollections = () => {
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="tanishq-section">
      <div className="container">
        <h2 className="section-title" style={{ marginBottom: '4rem' }}>
          Curated <span className="gold-text">Elegance</span>
        </h2>
        <div className="tanishq-grid">
          {collections.map((collection) => (
            <a 
              href={collection.link} 
              key={collection.id} 
              className="tanishq-card"
              onClick={(e) => handleScroll(e, collection.link)}
            >
              <div 
                className="tanishq-image" 
                style={{ backgroundImage: `url(${collection.image})` }}
              />
              <div className="tanishq-overlay">
                <h3 className="tanishq-title">{collection.title}</h3>
                <span className="tanishq-action">Explore Collection</span>
              </div>
              <div className="tanishq-border"></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
