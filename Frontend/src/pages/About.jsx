import React from 'react';

const About = () => {
  return (
    <div className="container py-4">
      {/* Page Title */}
      <h2 className="text-center text-danger mb-5">About Us</h2>

      {/* Welcome Section */}
      <div className="text-center mb-5">
        <h4 className="fw-bold text-dark">Welcome to Smart Mart</h4>
        <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
          At Smart Mart, we’re committed to delivering high-quality products and exceptional service.
          We bring the most trusted electronics, fashion, and accessories to your doorstep —
          making shopping easier, affordable, and reliable.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="row g-4">
        <div className="col-md-6">
          <div className="p-4 border rounded shadow-sm h-100 text-center">
            <h5 className="text-danger fw-semibold mb-3">Our Mission</h5>
            <p className="text-muted mb-0">
              To revolutionize online shopping with best-in-class products, fast delivery,
              and seamless support — all while keeping our customers at the heart of everything we do.
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="p-4 border rounded shadow-sm h-100 text-center">
            <h5 className="text-danger fw-semibold mb-3">Our Vision</h5>
            <p className="text-muted mb-0">
              To be the most trusted online marketplace for every household by delivering value,
              innovation, and a satisfying experience in every interaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

