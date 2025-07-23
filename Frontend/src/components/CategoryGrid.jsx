import React from 'react';
import { Link } from 'react-router-dom';

import mobileImg from '../assets/categories/mobile.jpg';
import watchImg from '../assets/categories/watches.jpg';
import laptopImg from '../assets/categories/laptop.jpg';
import airbudsImg from '../assets/categories/airbuds.jpg';
import headsetImg from '../assets/categories/headset.jpg';
import speakerImg from '../assets/categories/speakers.jpg';

const categories = [
  { name: 'Mobiles', image: mobileImg, link: '/category/mobiles' },
  { name: 'Watches', image: watchImg, link: '/category/watches' },
  { name: 'Laptops', image: laptopImg, link: '/category/laptops' },
  { name: 'Airbuds', image: airbudsImg, link: '/category/airbuds' },
  { name: 'Headsets', image: headsetImg, link: '/category/headsets' },
  { name: 'Speakers', image: speakerImg, link: '/category/speakers' },
];

const CategoryGrid = () => {
  return (
    <div className="container my-5">
      <h4 className="text-center fw-bold text-black mb-5 p-1 " style={{ fontSize: '1.5rem' }}>
        Our Categories
      </h4>

      <div className="row g-4">
        {categories.map((cat, idx) => (
          <div className="col-6 col-md-4 col-lg-2 text-center" key={idx}>
            <div className="card border-0 shadow-sm h-100">
              <img
                src={cat.image}
                alt={cat.name}
                className="card-img-top "
                style={{ height: '100px', objectFit: 'contain' }}
              />
              <div className="card-body">
                <h6 className="fw-semibold">{cat.name}</h6>
                <Link to={cat.link} className="btn bg-danger text-light btn-sm mt-2">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;

