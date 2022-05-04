import React, { useState } from 'react';
import api from '../../services/api';

export default function Login() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    try {
      await api.post('/posts', {
        title,
        body,
      });
    } catch (error) {
      // setError(error.data.message);
      setError('errado');
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
              value={body}
              onChange={(e) => setBody(e.target.value)}
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
              <div class="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
