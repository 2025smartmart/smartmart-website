import React from 'react';
import { Link } from 'react-router-dom';

import mobileImg from '../assets/categories/mobile.jpg';
import watchImg from '../assets/categories/watches.jpg';
import laptopImg from '../assets/categories/laptop.jpg';
import airbudsImg from '../assets/categories/airbuds.jpg';
import headsetImg from '../assets/categories/headset.jpg';
import speakerImg from '../assets/categories/speakers.jpg';

import './CategoryGrid.css';

const categories = [
  { name: 'Mobiles', image: mobileImg, link: '/category/mobiles', bgColor: 'rgba(52, 152, 219, 0.1)' },
  { name: 'Watches', image: watchImg, link: '/category/watches', bgColor: 'rgba(231, 76, 60, 0.1)' },
  { name: 'Laptops', image: laptopImg, link: '/category/laptops', bgColor: 'rgba(155, 89, 182, 0.1)' },
  { name: 'Airbuds', image: airbudsImg, link: '/category/airbuds', bgColor: 'rgba(26, 188, 156, 0.1)' },
  { name: 'Headsets', image: headsetImg, link: '/category/headsets', bgColor: 'rgba(241, 196, 15, 0.1)' },
  { name: 'Speakers', image: speakerImg, link: '/category/speakers', bgColor: 'rgba(46, 204, 113, 0.1)' },
];

const CategoryGrid = () => {
  return (
    <section className="category-section py-4">
      <div className="container">
        <div className="section-header text-center mb-5">
          <h2 className="text-center fw-semibold mb-5 text-dark">Shop By Category</h2>
          <p className="section-subtitle text-muted">Discover our populer collections</p>
        </div>

        <div className="row g-4">
          {categories.map((category, index) => (
            <div className="col-6 col-md-4 col-lg-2" key={index}>
              <Link to={category.link} className="text-decoration-none">
                <div className="category-card h-100 transition-all">
                  <div 
                    className="category-img-container position-relative overflow-hidden rounded-3"
                    style={{ backgroundColor: category.bgColor }}
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="category-img img-fluid"
                    />
                    <div className="category-overlay"></div>
                  </div>
                  <div className="category-content text-center mt-3">
                    <h5 className="category-name mb-2">{category.name}</h5>
                    <button className="btn btn-shop-now">
                      Shop Now <i className="bi bi-arrow-right ms-1"></i>
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;




