import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBox from './SearchBox';

const Header = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-black shadow-sm py-2 sticky-top">
      <div className="container d-flex align-items-center justify-content-between">

        {/* Logo */}
        <Link className="navbar-brand me-5" to="/">
          <img src={logo} alt="Smart Mart" height="40" />
        </Link>

        {/* Search Box */}
        <SearchBox/>
        

        {/* Navbar toggler */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="d-flex flex-wrap align-items-center justify-content-end w-100 gap-4 mt-3 mt-lg-0">
            <ul className="navbar-nav flex-row gap-5 mr-5">
              <li className="nav-item"><Link className="nav-link text-light fw-semibold" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link text-light fw-semibold" to="/shop">Shop</Link></li>
              <li className="nav-item"><Link className="nav-link text-light fw-semibold" to="/about">About</Link></li>
              <li className="nav-item"><Link className="nav-link text-light fw-semibold" to="/contact">Contact</Link></li>
              {user && user.role === 'admin' && (
                <li className="nav-item"><Link className="nav-link text-light fw-semibold" to="/dashboard">Dashboard</Link></li>
              )}
            </ul>

            {/* CART ICON */}
            <Link to="/cart" className="text-light position-relative">
              <i className="bi bi-cart3 fs-5"></i>
              {cartItems.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItems.length}
                </span>
              )}
            </Link>



            {/* AUTH SECTION */}
            {!user ? (
              <>
                <i className="bi bi-person-circle fs-5 text-light" data-bs-toggle="tooltip" title="Account"></i>
                <div className="dropdown">
                  <button className="btn btn-outline-light btn-sm dropdown-toggle" type="button" id="loginDropdown" data-bs-toggle="dropdown" aria-expanded="false">Login</button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="loginDropdown">
                    <li className="dropdown-item small d-flex justify-content-between">
                      <span>New user?</span>
                      <Link to="/signup" className="text-primary ms-2">Sign Up</Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link to="/login" className="dropdown-item">Login</Link></li>
                    <li><Link to="/orders" className="dropdown-item">Orders</Link></li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link to={user.role === 'admin' ? '/dashboard' : '/profile'} className="d-flex align-items-center text-light gap-2">
                  <i className="bi bi-person-circle fs-5" />
                  <span>{user.name?.split(' ')[0]}</span>
                </Link>
                <button onClick={handleLogout} className="btn btn-outline-light btn-sm" data-bs-toggle="tooltip" title="Logout">
                  <i className="bi bi-box-arrow-right"></i>
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
