import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg ms-4 me-4 bg-white shadow-sm py-2" style={{ padding: '0 30px' }}>
      <div className="container-fluid">

        {/* Logo */}
        <Link className="navbar-brand me-4" to="/">
          <img src={logo} alt="Smart Mart" height="40" />
        </Link>

        {/* Mobile Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="d-flex flex-grow-1 align-items-center justify-content-between gap-3 flex-wrap">

            {/* Navigation Links */}
            <ul className="navbar-nav flex-row gap-5">
              <li className="nav-item">
                <Link className="nav-link ms-5 text-danger" to="/">Home</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-danger" to="/shop">Shop</Link>
              </li>

            
              <li className="nav-item">
                <Link className="nav-link text-danger" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-danger" to="/contact">Contact</Link>
              </li>
            </ul>

            {/* Search Box */}
            <form className="d-flex" style={{ maxWidth: '250px', width: '100%' }}>
              <div className="input-group rounded shadow-sm">
                <input
                  type="search"
                  className="form-control border-danger"
                  placeholder="Search..."
                  style={{ borderRadius: '30px 0 0 30px' }}
                />
                <button className="btn btn-danger" type="submit" style={{ borderRadius: '0 30px 30px 0' }}>
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>

            {/* Cart */}
            <div className="d-flex align-items-center gap-3">
              <Link to="/cart" className="text-danger">
                <i className="bi bi-cart-fill fs-5"></i>
                
              </Link>

               {/* Profile Icon (Bootstrap Icon) */}
  <a href="/profile" className="mx-2">
    <i className="bi bi-person-circle text-danger fs-5"></i> 
  </a>
  

              <div className="dropdown">
                <button
                  className="btn btn-sm btn-outline-danger dropdown-toggle"
                  type="button"
                  id="loginDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Login
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="loginDropdown">
                  <li className="dropdown-item d-flex justify-content-between small">
                    <span>New customer?</span>
                    <Link to="/signup" className="text-primary ms-2">Sign Up</Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link to="/login" className="dropdown-item">Login</Link></li>
                  <li><Link to="/orders" className="dropdown-item">Orders</Link></li>
                </ul>
              </div>
            </div>

          </div>
        </div>

      </div>
    </nav>
  );
};

export default Header;











