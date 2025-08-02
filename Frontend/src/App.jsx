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
import ProductUploadForm from "./components/ProductUploadForm";

import AdminRoute from "./routes/AdminRoute";
import AddProduct from "./pages/AddProduct";
import ManageProducts from "./pages/ManageProducts";
import AddCategory from "./pages/AddCategory";

import UserRoute from "./routes/UserRoute";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import AdminProductList from "./pages/admin/AdminProductList";
import AdminDashboard from "./pages/AdminDashboard";


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

        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="dashboard" element={<h2>Welcome Admin</h2>} />
        <Route path="products" element={<AdminProductList />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="manage-products" element={<ManageProducts />} />
        <Route path="add-category" element={<AddCategory />} />
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
