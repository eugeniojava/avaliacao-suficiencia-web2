import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

export default function Profile() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [login, setLogin] = useState(currentUser.login);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    try {
      if (login === '' || email === '') {
        setError('Login and email fields are required');
        return;
      }
      await api.put(`/users/${currentUser.id}`, {
        login,
        email,
        password,
      });
      setSuccess('User updated successfully. Logging out...');
      setTimeout(() => {
        logout();
      }, 3000);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form>
          <h3>Profile</h3>
          <div className="mb-3">
            <label>Login *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your new login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Email *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your new email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Password</label> (optional)
            <input
              type="password"
              className="form-control"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button
              onClick={handleSubmit}
              type="button"
              className="btn btn-primary"
            >
              Update
            </button>
            {success && (
              <>
                <div className="alert alert-success mt-3" role="alert">
                  {success}
                </div>
                <div className="d-flex justify-content-center mt-3 text-success">
                  <div className="spinner-border" role="status"></div>
                </div>
              </>
            )}
            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
