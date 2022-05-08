import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../services/api';

export default function Login() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    try {
      await api.post('/posts', {
        title,
        content,
      });
      navigate('/');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form>
          <h3>Create Post</h3>
          <div className="mb-3">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Body</label>
            <textarea
              type="text"
              className="form-control"
              placeholder="Enter post body"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button
              onClick={handleSubmit}
              type="button"
              className="btn btn-primary"
            >
              Submit
            </button>
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
