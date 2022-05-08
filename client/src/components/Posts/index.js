import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

export default function Posts() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [author, setAuthor] = useState('');
  const [authors, setAuthors] = useState([]);
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [success, setSuccess] = useState('');

  // useEffect(() => {
  //   async function fetchData() {
  //     // You can await here
  //     const response = await MyAPI.getData(someId);
  //     // ...
  //   }
  //   fetchData();
  // }, [someId]); // Or [] if effect doesn't need props or state

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('/users?filter=having-post');
        setAuthors(response.data);
      } catch (error) {
        setAuthors([]);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (search) {
      setAuthor('');
      api.get(`/posts?filter=${search}`).then((response) => {
        setPosts(response.data);
      });
    } else {
      api.get('/posts').then((response) => {
        setPosts(response.data);
      });
    }
  }, [search]);

  useEffect(() => {
    if (author) {
      setSearch('');
      api.get(`/posts?author=${author}`).then((response) => {
        setPosts(response.data);
      });
    } else {
      api.get('/posts').then((response) => {
        setPosts(response.data);
      });
    }
  }, [author]);

  const deletePostById = (postId) => {
    api.delete(`/posts/${postId}`).then(() => {
      setPosts(posts.filter((post) => post.id !== postId));
      setSuccess('Post deleted successfully');
    });
  };

  return (
    <div className="container">
      {success && (
        <div className="alert alert-success mt-3" role="alert">
          Post deleted successfully
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => {
              setSuccess('');
            }}
          ></button>
        </div>
      )}
      <select
        className="form-select mt-3"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      >
        <option value="">Filter by author</option>
        {authors.map((item, index) => (
          <option key={index.toString()} value={item.login}>
            {item.login}
          </option>
        ))}
      </select>
      <input
        type="text"
        className="form-control mt-3"
        placeholder="Search by title and content"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="row">
        {posts.map((item, index) => (
          <div
            key={index.toString()}
            className="card m-3"
            style={{
              width: '18rem',
            }}
          >
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">{item.content}</p>
              <p>By: {item.login}</p>
              <button
                onClick={() =>
                  navigate(`/post/${item.id}`, {
                    state: {
                      post: item,
                    },
                  })
                }
                type="button"
                className="btn btn-primary"
                style={{
                  backgroundColor: '#1c8ef9',
                }}
              >
                Read more
              </button>
              {currentUser.isAdmin && (
                <button
                  onClick={() => deletePostById(item.id)}
                  type="button"
                  className="btn btn-danger"
                  style={{
                    marginLeft: '5px',
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
