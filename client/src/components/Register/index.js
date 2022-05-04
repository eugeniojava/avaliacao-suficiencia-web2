import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/authentication';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    try {
      if (login === '' || email === '' || password === '') {
        setError('All fields are required');
        return;
      }
      await register(login, email, password);
      navigate('/');
    } catch (error) {
      setError(error.data.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form>
          <h3>Register</h3>
          <div className="mb-3">
            <label>Login</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary"
            >
              Register
            </button>
            {error && (
              <div class="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}
          </div>
          <p className="forgot-password text-right">
            <Link to={'/login'}>Already registered</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
