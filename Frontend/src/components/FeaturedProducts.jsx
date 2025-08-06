import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Spinner,
  Button,
  Badge,
  OverlayTrigger,
  Tooltip,
  Modal,
  Toast,
  ToastContainer
} from 'react-bootstrap';
import { FaCartPlus, FaHeart, FaEye, FaStar, FaBolt } from 'react-icons/fa';
import './FeaturedProducts.css';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/featured');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const toggleWishlist = (productId) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleBuyNow = (id) => {
    setShowToast(true);
    navigate(`/product/${id}`);
  };

  return (
    <section className="featured-products-section">
      <div className="container py-5">
        <div className="section-intro text-center mb-5">
          <h6 className="section-pretitle text-uppercase text-muted mb-3">Top Collection</h6>
          <h2 className="text-center fw-semibold mb-5 text-dark">OUR PRODUCTS</h2>
          <div className="divider mx-auto"></div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" className="spinner-grow-lg" />
            <p className="mt-3 text-muted">Curating our finest selection...</p>
          </div>
        ) : (
          <div className="row g-4">
            {products.length > 0 ? (
              products.map(product => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product._id}>
                  <div className="product-card-wrapper">
                    <div className="product-card card border-0 h-100">
                      <div className="product-img-container position-relative overflow-hidden">
                        <div className="product-badge position-absolute">
                          {product.isNew && (
                            <Badge pill bg="danger" className="new-badge">New</Badge>
                          )}
                          {product.discount > 0 && (
                            <Badge pill bg="success" className="discount-badge">
                              -{product.discount}%
                            </Badge>
                          )}
                        </div>

                        <div className="product-actions position-absolute">
                          <button
                            className={`wishlist-btn ${wishlist.includes(product._id) ? 'active' : ''}`}
                            onClick={() => toggleWishlist(product._id)}
                          >
                            <FaHeart />
                          </button>
                          <OverlayTrigger placement="top" overlay={<Tooltip>Quick View</Tooltip>}>
                            <button className="quickview-btn" onClick={() => setQuickViewProduct(product)}>
                              <FaEye />
                            </button>
                          </OverlayTrigger>
                        </div>

                        <img
                          src={`http://localhost:5000${product.image}`}
                          alt={product.name}
                          className="img-fluid product-img"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x300?text=Product+Image';
                          }}
                        />
                      </div>

                      <div className="card-body position-relative d-flex flex-column">
                        <div className="product-category mb-1">
                          <Badge pill bg="light" text="dark" className="text-uppercase">
                            {product.category?.name || 'General'}
                          </Badge>
                        </div>

                        <h5 className="product-title mb-2">
                          <a href={`/product/${product._id}`}>{product.name}</a>
                        </h5>

                        <div className="product-price-wrapper mb-3">
                          {product.discount > 0 ? (
                            <>
                              <span className="current-price">₹{(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                              <span className="original-price">₹{product.price.toLocaleString()}</span>
                            </>
                          ) : (
                            <span className="current-price">₹{product.price.toLocaleString()}</span>
                          )}
                        </div>

                            <div className="d-flex justify-content-between gap-2">
   <Button
    variant="primary"
    className="flex-fill"
    onClick={() => addToCart(product)}
  >
    <FaCartPlus className="me-2" /> Add to Cart
  </Button>
  <Button
    variant="success"
    className="flex-fill"
    onClick={() => handleBuyNow(product._id)}
  >
    <FaBolt className="me-2" /> Buy Now
  </Button>
</div>

                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <div className="alert alert-light border">
                  <i className="bi bi-exclamation-circle display-4 text-muted mb-3"></i>
                  <h4 className="mb-3">No Featured Products Available</h4>
                  <p className="text-muted">Check back later for our special selections</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <Modal show={!!quickViewProduct} onHide={() => setQuickViewProduct(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{quickViewProduct?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={`http://localhost:5000${quickViewProduct?.image}`}
            alt={quickViewProduct?.name}
            className="img-fluid mb-3"
          />
          <p><strong>Price:</strong> ₹{quickViewProduct?.price}</p>
          <p><strong>Description:</strong> {quickViewProduct?.description || 'No description available.'}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setQuickViewProduct(null)}>Close</Button>
          <Button variant="primary" onClick={() => {
            addToCart(quickViewProduct);
            setShowToast(true);
          }}>
            <FaCartPlus className="me-2" /> Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={2000} autohide bg="info">
          <Toast.Header closeButton={false}>
            <strong className="me-auto">SMART MART</strong>
          </Toast.Header>
          <Toast.Body>Redirecting to product page...</Toast.Body>
        </Toast>
      </ToastContainer>
    </section>
  );
};

export default FeaturedProducts;






