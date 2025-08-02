import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/login",
      { email, password },
      { withCredentials: true }
    );

    if (data.success) {
      const user = data.data.user;
      const token = data.data.token;

      // ✅ Fix: Save token to localStorage
      localStorage.setItem('token', token);

      // Save to context (optional)
      login({ ...user, token });

      toast.success('Login successful');

      // Redirect based on role
      if (user && user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/profile', { replace: true });
      }
    } else {
      toast.error(data.message || 'Login failed');
    }
  } catch (err) {
    console.error(err);
    toast.error("Login failed. Check your credentials.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h4 className="text-center text-danger mb-3">Welcome Back</h4>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-1">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 text-end">
            <Link to="/forgot-password" className="text-decoration-none small text-primary">
              Forgot Password?
            </Link>
          </div>

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-danger" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </div>

          <div className="text-center">
            <small>
              New customer? <Link to="/signup" className="text-primary">Create an account</Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;










