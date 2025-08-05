import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Form } from 'react-bootstrap';
import ShopFilters from './ShopFilters';
import ProductCard from './Productcard';

import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('popularity');
  const [wishlist, setWishlist] = useState([]);

  const [filters, setFilters] = useState({
    category: '',
    priceRange: [100, 80000],
    brand: ''
  });

  // Fetch products with error handling
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/products');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Validate and format products
        const validatedProducts = Array.isArray(data) ? data.map(p => ({
          _id: p._id?.toString() || '',
          name: p.name?.toString() || 'Unnamed Product',
          description: p.description?.toString() || 'No description available',
          price: Number(p.price) || 0,
          image: p.image?.toString() || '',
          category: p.category?.name?.toString() || 'Uncategorized',
          brand: p.brand?.toString() || 'Unknown Brand',
          discount: Number(p.discount) || 0,
          isNew: Boolean(p.isNew),
          popularity: Number(p.popularity) || 0,
          createdAt: p.createdAt ? new Date(p.createdAt) : new Date()
        })) : [];
        
        setProducts(validatedProducts);
        setFilteredProducts(validatedProducts);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    try {
      let results = [...products];
      
      // Apply filters
      if (filters.category) {
        results = results.filter(p => p.category === filters.category);
      }
      if (filters.brand) {
        results = results.filter(p => p.brand === filters.brand);
      }
      results = results.filter(p => 
        p.price >= filters.priceRange[0] && 
        p.price <= filters.priceRange[1]
      );

      // Apply sorting
      switch(sortBy) {
        case 'price-low-high':
          results.sort((a, b) => a.price - b.price);
          break;
        case 'price-high-low':
          results.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          results.sort((a, b) => b.createdAt - a.createdAt);
          break;
        default: // popularity
          results.sort((a, b) => b.popularity - a.popularity);
      }

      setFilteredProducts(results);
    } catch (error) {
      console.error('Error filtering products:', error);
      setFilteredProducts([]);
    }
  }, [filters, products, sortBy]);

  // Extract unique categories and brands
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
  const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading products...</p>
      </div>
    );
  }

  return (
    <Container className="shop-page py-5">
      <Row>
        {/* Filters Sidebar */}
        <Col lg={3} className="pe-lg-4 mb-4 mb-lg-0">
          <ShopFilters 
            filters={filters} 
            setFilters={setFilters}
            categories={categories}
            brands={brands}
          />
        </Col>

        {/* Products Grid */}
        <Col lg={9}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Shop Products</h2>
            <Form.Select 
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popularity">Sort by: Popularity</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </Form.Select>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-5 bg-white rounded-3 shadow-sm">
              <h5>No products match your filters</h5>
              <button 
                className="btn btn-outline-primary mt-3"
                onClick={() => setFilters({
                  category: '',
                  priceRange: [100, 80000],
                  brand: ''
                })}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <Row className="g-4">
              {filteredProducts.map(product => (
                <Col key={product._id} xs={6} md={4} lg={4} xl={3}>
                  <ProductCard 
                    product={product}
                    isInWishlist={wishlist.includes(product._id)}
                    onWishlistToggle={toggleWishlist}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;
