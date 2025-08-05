import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'; 

import Home from "./pages/Home"
import ShopPage from "./pages/ShopPage";
import About from "./pages/About"
import Contact from "./pages/Contact"
import Header from './components/Header'
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/Forgotpassword"
import Footer from "./components/Footer"


import UserRoute from "./routes/UserRoute";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import ProductPage from "./pages/ProductPage";
import SearchResults from "./pages/SearchResults";



const AppContent = () => {
  const location = useLocation();
  const path = location.pathname;

  // List of paths where Footer should be visible
  const showFooterPaths = ['/', '/shop'];

  const shouldShowFooter = showFooterPaths.includes(path);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/profile" element={<UserRoute><Profile /></UserRoute>} />
        <Route path="/orders" element={<UserRoute><Orders /></UserRoute>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/search" element={<SearchResults />} />
    
      </Routes>

      {/* Conditionally render Footer */}
      {shouldShowFooter && <Footer />}
    </>
  );
};


const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
       <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
};

export default App;
