import React, { useState, useEffect } from 'react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=1600',
    title: 'Luxury Bags',
    subtitle: 'Carry elegance wherever you go.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1614252235316-c146eaf8dff7?auto=format&fit=crop&q=80&w=1600',
    title: 'Premium Shoes',
    subtitle: 'Step into sophistication.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1600',
    title: 'Classic Watches',
    subtitle: 'Timepieces that define prestige.'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=1600',
    title: 'Designer Specs',
    subtitle: 'Vision with impeccable style.'
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section style={styles.hero}>
      {slides.map((slide, index) => (
        <div 
          key={slide.id} 
          style={{
            ...styles.slide,
            opacity: index === currentSlide ? 1 : 0,
            zIndex: index === currentSlide ? 1 : 0
          }}
        >
          <div style={{
            ...styles.imageBg,
            backgroundImage: `url(${slide.image})`,
            transform: index === currentSlide ? 'scale(1)' : 'scale(1.05)'
          }} />
          <div style={styles.overlay} />
          
          <div className="container" style={{
            ...styles.content,
            opacity: index === currentSlide ? 1 : 0,
            transform: index === currentSlide ? 'translateY(0)' : 'translateY(20px)'
          }}>
            <h1 className="hero-title">{slide.title}</h1>
            <p className="hero-subtitle">{slide.subtitle}</p>
            <button 
              className="btn-primary" 
              style={{ marginTop: '2rem' }}
              onClick={() => document.getElementById('shoes')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              Explore Collection
            </button>
          </div>
        </div>
      ))}
      
      <button style={{...styles.navBtn, left: '20px'}} onClick={prevSlide}>&#10094;</button>
      <button style={{...styles.navBtn, right: '20px'}} onClick={nextSlide}>&#10095;</button>
      
      <div style={styles.dots}>
        {slides.map((_, idx) => (
          <span 
            key={idx} 
            style={{
              ...styles.dot,
              backgroundColor: idx === currentSlide ? 'var(--gold-color)' : 'rgba(255,255,255,0.5)'
            }}
            onClick={() => setCurrentSlide(idx)}
          />
        ))}
      </div>
    </section>
  );
};

const styles = {
  hero: {
    height: '85vh',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  slide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'opacity 1s ease-in-out, z-index 1s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'transform 6s ease-out',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', /* Dark overlay for text readability */
    zIndex: 1,
  },
  content: {
    textAlign: 'center',
    zIndex: 2,
    transition: 'all 1s ease-out 0.3s',
  },
  navBtn: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: 'rgba(255,255,255,0.7)',
    fontSize: '3rem',
    cursor: 'pointer',
    zIndex: 10,
    transition: 'color 0.3s',
  },
  dots: {
    position: 'absolute',
    bottom: '30px',
    width: '100%',
    textAlign: 'center',
    zIndex: 10,
  },
  dot: {
    display: 'inline-block',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    margin: '0 8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  }
};

export default HeroSection;
