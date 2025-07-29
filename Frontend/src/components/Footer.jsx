import React from 'react';
import { FaFacebookF, FaInstagram, FaEnvelope, } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row gy-4">
          {/* Logo & About */}
          <div className="col-md-3">
            <img src={logo} alt="Smart Mart" height="40" />
            <p className="mt-3">
              In Smart Mart we sell high quality electronics products in affordable price.
            </p>
            <div className="d-flex gap-3 mt-2">
              <a href="#" className="text-white fs-5"><FaFacebookF /></a>
              <a href="#" className="text-white fs-5"><FaInstagram /></a>
            </div>
          </div>

          {/* Services */}
          <div className="col-md-3">
            <h5 className="fw-bold">Services</h5>
            <hr className="border-primary border-2 opacity-100 w-25" />
            <ul className="list-unstyled">
              <li>Free Delivery</li>
              <li>Easy Returns</li>
              <li>Premium Quality</li>
              <li>24/7 Support</li>
              <li>Secure Payment</li>
               <li>Fast Shipping</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-md-3">
            <h5 className="fw-bold">Quick Links</h5>
            <hr className="border-primary border-2 opacity-100 w-25" />
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/shop" className="text-white text-decoration-none">Shop</a></li>
              <li><a href="/about" className="text-white text-decoration-none">About Us</a></li>
              <li><a href="/contact" className="text-white text-decoration-none">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3">
            <h5 className="fw-bold">Contact</h5>
            <hr className="border-primary border-2 opacity-100 w-25" />
            <p className="mb-2"><FaEnvelope className="me-2" />smartmart674@gmail.com</p>
          </div>
        </div>
        <hr className="text-secondary mt-4" />
        <p className="text-center mb-0">Copyright © 2025 <strong>Smart Mart</strong>. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
