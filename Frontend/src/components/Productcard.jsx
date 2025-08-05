import React from 'react';
import { Card, Button, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaCartPlus, FaHeart, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Ensure CartContext is correctly implemented

const ProductCard = ({ product, isInWishlist, onWishlistToggle }) => {
  const { addToCart } = useCart(); // Access addToCart function from context

  return (
    <Card className="h-100 product-card border-0 bg-white shadow-sm">
      <div className="product-img-container position-relative">
        <Link to={`/product/${product._id}`}>
          <Card.Img
            variant="top"
            src={product.image ? `http://localhost:5000${product.image}` : 'https://via.placeholder.com/300x300?text=No+Image'}
            alt={product.name}
            className="product-img p-3"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x300?text=Image+Error';
              e.target.onerror = null;
            }}
          />
        </Link>

        {/* Badges */}
        <div className="product-badges position-absolute top-0 start-0 p-2">
          {product.isNew && <Badge pill bg="light" text="dark" className="me-1">New</Badge>}
          {product.discount > 0 && <Badge pill bg="success">-{product.discount}%</Badge>}
        </div>

        {/* Wishlist Button */}
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>{isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</Tooltip>}
        >
          <Button
            variant="link"
            className={`wishlist-btn position-absolute top-0 end-0 m-2 p-2 ${isInWishlist ? 'text-danger' : 'text-secondary'}`}
            onClick={() => onWishlistToggle(product._id)}
          >
            <FaHeart size={18} />
          </Button>
        </OverlayTrigger>
      </div>

      <Card.Body className="d-flex flex-column p-3">
        {/* Category Badge */}
        <Badge bg="light" text="dark" className="mb-2 align-self-start">
          {product.category}
        </Badge>

        {/* Product Name */}
        <Card.Title className="mb-2 fs-6">
          <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
            {product.name}
          </Link>
        </Card.Title>

        {/* Price & Cart Button */}
        <div className="mt-auto">
          <div className="product-price mb-3">
            {product.discount > 0 ? (
              <>
                <span className="current-price fw-bold fs-5">₹{(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                <span className="original-price text-muted text-decoration-line-through ms-2 small">
                  ₹{product.price.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="current-price fw-bold fs-5">₹{product.price.toLocaleString()}</span>
            )}
          </div>

          {/* Add to Cart */}
          <Button
            variant="primary"
            className="w-100 add-to-cart-btn py-2"
            onClick={() => addToCart(product)}
          >
            <FaCartPlus className="me-2" />
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
