import React from 'react';

const categories = ['Mobiles', 'Watches', 'Laptops', 'Airbuds', 'Earphones', 'Speaker', 'TV'];

const ShopFilters = ({ filters, setFilters }) => {
  const handleCategoryChange = (category) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setFilters((prev) => ({
      ...prev,
      priceRange: [100, value]
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      priceRange: [100, 80000],
      brand: '',
      rating: 0
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Filters</h5>
        <button className="btn btn-sm btn-outline-danger" onClick={handleClearFilters}>
          Clear
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <h6>Category</h6>
        {categories.map((cat) => (
          <div className="form-check" key={cat}>
            <input
              className="form-check-input"
              type="radio"
              name="category"
              id={`cat-${cat}`}
              checked={filters.category === cat}
              onChange={() => handleCategoryChange(cat)}
            />
            <label className="form-check-label" htmlFor={`cat-${cat}`}>
              {cat}
            </label>
          </div>
        ))}
      </div>

      {/* Price Range Slider */}
      <div className="mb-4">
  <h6>Price</h6>
  <div style={{ width: '80%' }}>
    <input
      type="range"
      className="form-range"
      min="100"
      max="80000"
      value={filters.priceRange[1]}
      onChange={(e) =>
        setFilters((prev) => ({
          ...prev,
          priceRange: [prev.priceRange[0], Number(e.target.value)],
        }))
      }
    />
  </div>
  <div className="text-muted small mt-1">
    ₹{filters.priceRange[0].toLocaleString()} - ₹{filters.priceRange[1].toLocaleString()}
  </div>
  </div>
  </div>

  );
};

export default ShopFilters;

