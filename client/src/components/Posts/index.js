import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

const Posts = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [author, setAuthor] = useState('');
  const [authors, setAuthors] = useState([]);
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (authors.length <= 0) {
      api.get('/users?filter=having-post').then(({ data }) => {
        setAuthors(data);
      });
    }
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
  }, [author, authors]);

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

  return (
    <div className="container">
      <select
        className="form-select mt-3"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      >
        <option defaultValue="">Filter by author</option>
        {authors.map((item, index) => (
          <option key={index.toString()} value={item.login}>
            {item.login}
          </option>
        ))}
      </select>
      <input
        type="text"
        className="form-control mt-3"
        placeholder="Search"
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
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
