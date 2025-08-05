import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner, Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { FaCartPlus } from 'react-icons/fa';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './ProductPage.css'; // Optional: custom styles

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleBuyNow = () => {
    localStorage.setItem("checkoutProduct", JSON.stringify(product));
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-5">
        <h4>Product Not Found</h4>
      </div>
    );
  }

  return (
    <Container className="py-5">
      <Row className="align-items-start g-4">
        {/* Product Image */}
        <Col xs={12} md={6}>
          <div className="product-image-wrapper">
            <img
              src={`http://localhost:5000${product.image}`}
              alt={product.name}
              className="img-fluid rounded shadow-sm w-100"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500x500?text=No+Image';
              }}
            />
          </div>
        </Col>

        {/* Product Details */}
        <Col xs={12} md={6}>
          <div className="product-details-wrapper">
            <h2 className="fw-bold mb-3">{product.name}</h2>

            <Badge bg="secondary" className="mb-3 text-uppercase">
              {product.category?.name || 'Uncategorized'}
            </Badge>

            <p className="text-muted mb-4" style={{ fontSize: '1.05rem' }}>
              {product.description}
            </p>

            <h5 className="mb-3">
              Brand: <span className="text-primary">{product.brand}</span>
            </h5>

            <div className="product-pricing mb-4">
              {product.discount > 0 ? (
                <>
                  <span className="h4 text-danger me-3">
                    ₹{(product.price * (1 - product.discount / 100)).toFixed(2)}
                  </span>
                  <span className="text-muted text-decoration-line-through">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <Badge bg="success" className="ms-2">
                    -{product.discount}%
                  </Badge>
                </>
              ) : (
                <span className="h4">₹{product.price.toLocaleString()}</span>
              )}
            </div>

            <div className="d-flex gap-3">
              <Button variant="primary" className="px-4 py-2" onClick={() => addToCart(product)}>
                <FaCartPlus className="me-2" />
                Add to Cart
              </Button>

              <Button variant="success" className="px-4 py-2" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;


