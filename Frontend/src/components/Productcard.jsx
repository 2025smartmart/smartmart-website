import React from 'react';
import { Card, Button, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css'



const ProductCard = ({ product, isInWishlist, onWishlistToggle }) => {
  const { addToCart } = useCart();

  return (
    <Card className="product-card border-0 bg-white shadow-sm rounded-4 overflow-hidden h-100">
      <div className="position-relative product-img-container bg-light">
        <Link to={`/product/${product._id}`}>
          <Card.Img
            variant="top"
            src={product.image ? `http://localhost:5000${product.image}` : 'https://via.placeholder.com/300x300?text=No+Image'}
            alt={product.name}
            className="product-img w-100 object-fit-contain"
            style={{ height: '200px', padding: '1rem', objectFit: 'contain' }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x300?text=Image+Error';
              e.target.onerror = null;
            }}
          />
        </Link>

        {/* Badges */}
        <div className="position-absolute top-0 start-0 p-2 d-flex flex-column gap-1">
          {product.isNew && <Badge pill bg="light" text="dark">New</Badge>}
          {product.discount > 0 && <Badge pill bg="success">-{product.discount}%</Badge>}
        </div>

        {/* Wishlist Button */}
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>{isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</Tooltip>}
        >
          <Button
            variant="light"
            className={`position-absolute top-0 end-0 m-2 p-1 rounded-circle ${isInWishlist ? 'text-danger' : 'text-muted'}`}
            onClick={() => onWishlistToggle(product._id)}
            style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
          >
            <FaHeart size={16} />
          </Button>
        </OverlayTrigger>
      </div>

      <Card.Body className="d-flex flex-column p-3">
        {/* Category */}
        {product.category?.name && (
          <Badge bg="secondary" className="mb-2 align-self-start">
            {product.category.name}
          </Badge>
        )}

        {/* Product Name */}
        <Card.Title className="mb-1 fs-6 fw-semibold text-truncate" title={product.name}>
          <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
            {product.name}
          </Link>
        </Card.Title>

        {/* Price Section */}
        <div className="mb-3">
          {product.discount > 0 ? (
            <>
              <span className="text-primary fw-bold fs-6">₹{(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
              <span className="text-muted text-decoration-line-through ms-2 small">₹{product.price.toLocaleString()}</span>
            </>
          ) : (
            <span className="text-primary fw-bold fs-6">₹{product.price.toLocaleString()}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          variant="primary"
          className="w-100 py-2 d-flex align-items-center justify-content-center gap-2"
          onClick={() => addToCart(product)}
        >
          <FaCartPlus />
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;

