import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Post() {
  const { state } = useLocation();
  const { post } = state;

  return (
    <div className="container">
      <div className="card m-3">
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">By: {post.login}</p>
          <p className="card-text">{post.content}</p>
        </div>
      </div>
    </div>
  );
}
