import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold text-primary">🌟 Featured Products</h2>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="row g-4">
          {products.length > 0 ? (
            products.map(product => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={product._id}>
                <div className="card h-100 border-0 shadow-sm">
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="card-img-top img-fluid"
                    style={{ objectFit: 'cover', height: '200px' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-dark fw-semibold">{product.name}</h5>
                    <p className="card-text text-muted small">{product.description || 'No description'}</p>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <span className="text-success fw-bold">₹{product.price}</span>
                      <span className="badge bg-secondary">
                        {product.category?.name || 'Uncategorized'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No featured products available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;


