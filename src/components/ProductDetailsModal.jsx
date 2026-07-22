import React from 'react';

const ProductDetailsModal = ({ isOpen, onClose, product }) => {
  const [mainImage, setMainImage] = React.useState('');
  const [fullProduct, setFullProduct] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (product && isOpen) {
      setMainImage(`/api/products/${product.id}/image`);
      setFullProduct(product); // initial fallback
      
      const fetchFull = async () => {
        setIsLoading(true);
        try {
          const res = await fetch(`/api/products/${product.id}`);
          if (res.ok) {
            const data = await res.json();
            setFullProduct(data);
            setMainImage((data.images && data.images.length > 0 ? data.images[0] : data.image) || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80");
          }
        } catch (e) {
          console.error("Error fetching full product", e);
        } finally {
          setIsLoading(false);
        }
      };
      fetchFull();
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const displayProduct = fullProduct || product;

  const handleBuyClick = () => {
    const message = encodeURIComponent(`Hi, I'm interested in buying the ${displayProduct.name} for ₹${displayProduct.price}.`);
    window.open(`https://ig.me/m/12store.in?text=${message}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        {isLoading && !fullProduct?.images ? (
          <div style={{padding: '3rem', textAlign: 'center'}}>Loading details...</div>
        ) : (
          <div style={styles.container}>
            <div style={styles.imageCol}>
              <img 
                src={mainImage} 
                alt={displayProduct.name} 
                style={styles.image} 
              />
              {displayProduct.images && displayProduct.images.length > 1 && (
                <div style={styles.thumbnailContainer}>
                  {displayProduct.images.map((img, idx) => (
                    <img 
                      key={idx}
                      src={img}
                      alt={`${displayProduct.name} view ${idx + 1}`}
                      style={{
                        ...styles.thumbnail,
                        border: mainImage === img ? '2px solid var(--gold-color)' : '1px solid var(--border-color)'
                      }}
                      onClick={() => setMainImage(img)}
                    />
                  ))}
                </div>
              )}
            </div>
          
          <div style={styles.infoCol}>
            <p style={styles.category}>{displayProduct.category}</p>
            <h2 style={styles.title}>{displayProduct.name}</h2>
            <div style={styles.priceContainer}>
              {displayProduct.actualPrice && (
                <span style={styles.actualPrice}>₹{parseFloat(displayProduct.actualPrice).toFixed(2)}</span>
              )}
              <span style={styles.price}>₹{parseFloat(displayProduct.price).toFixed(2)}</span>
            </div>
            
            <div style={styles.divider}></div>
            
            <h4 style={{fontFamily: 'var(--font-heading)', marginBottom: '0.5rem'}}>Product Details</h4>
            <p style={styles.details}>{displayProduct.details || "No details available for this product."}</p>
            
            <button className="btn-primary" style={{marginTop: '2rem', width: '100%'}} onClick={handleBuyClick}>
              Buy on Instagram
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  imageCol: {
    flex: '1 1 300px',
  },
  image: {
    width: '100%',
    height: 'auto',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  thumbnailContainer: {
    display: 'flex',
    gap: '10px',
    marginTop: '15px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  thumbnail: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'border 0.3s ease',
  },
  infoCol: {
    flex: '1 1 300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  category: {
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: 'var(--text-secondary)',
    fontSize: '0.85rem',
    marginBottom: '0.5rem',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: 'var(--accent-color)',
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  price: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: 'var(--gold-color)',
  },
  actualPrice: {
    fontSize: '1.2rem',
    color: 'var(--text-secondary)',
    textDecoration: 'line-through',
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--border-color)',
    margin: '1.5rem 0',
  },
  details: {
    color: 'var(--text-secondary)',
    lineHeight: '1.8',
  }
};

export default ProductDetailsModal;
