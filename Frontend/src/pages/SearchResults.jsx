import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Badge } from "react-bootstrap";
import { FaCartPlus, FaBolt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SearchResults.css";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/Productcard";

const SearchResults = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(search).get("q")?.trim() || "";
  const [results, setResults] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/search?q=${query}`);
        setResults(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      }
    };

    if (query) fetchResults();
  }, [query]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`🛒 ${product.name} added to cart!`);
  };

  const handleBuyNow = (id) => {
    navigate(`/product/${id}`);
  };

  const highlightSearch = (text) => {
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  return (
    <div className="container py-5">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop />

      <div className="text-center mb-5">
        <h2 className="fw-semibold text-dark">
          Search Results for: <span className="text-primary">"{query}"</span>
        </h2>
        <div className="divider mx-auto"></div>
      </div>

      <div className="row g-4">
        {results.length > 0 ? (
          results.map((product) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product._id}>
              <div className="product-card card border-0 h-100">
                <div className="product-img-container position-relative overflow-hidden">
                  <div className="product-badge position-absolute">
                    {product.isNew && <Badge pill bg="danger">New</Badge>}
                    {product.discount > 0 && (
                      <Badge pill bg="success" className="ms-1">
                        -{product.discount}%
                      </Badge>
                    )}
                  </div>
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="img-fluid product-img"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x300?text=Image+Not+Found";
                    }}
                    onClick={() => handleBuyNow(product._id)}
                    role="button"
                  />
                </div>

                <div className="card-body d-flex flex-column">
                  <div className="product-category mb-2">
                    <Badge pill bg="light" text="dark" className="text-uppercase">
                      {product.category?.name || "General"}
                    </Badge>
                  </div>

                  <h5
                    className="product-title mb-2 text-dark"
                    dangerouslySetInnerHTML={{ __html: highlightSearch(product.name) }}
                  />

                  <div className="product-price-wrapper mb-3">
                    {product.discount > 0 ? (
                      <>
                        <span className="current-price text-success fw-bold me-2">
                          ₹{(product.price * (1 - product.discount / 100)).toFixed(2)}
                        </span>
                        <span className="original-price text-muted text-decoration-line-through">
                          ₹{product.price.toLocaleString()}
                        </span>
                      </>
                    ) : (
                      <span className="current-price text-success fw-bold">
                        ₹{product.price.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="d-flex justify-content-between gap-2 mt-auto">
                    <Button variant="primary" className="flex-fill" onClick={() => handleAddToCart(product)}>
                      <FaCartPlus className="me-2" /> Add to Cart
                    </Button>
                    <Button variant="success" className="flex-fill" onClick={() => handleBuyNow(product._id)}>
                      <FaBolt className="me-2" /> Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <div className="alert alert-light border">
              <i className="bi bi-search display-4 text-muted mb-3"></i>
              <h4 className="mb-3">No Results Found</h4>
              <p className="text-muted">We couldn’t find anything for "<strong>{query}</strong>". Try different keywords.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;



