import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Posts = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/posts').then((response) => {
      setPosts(response.data);
    });
  }, []);

  const data = useMemo(() => {
    if (!search) return posts;
    return posts?.filter((item) =>
      item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }, [posts, search]);

  return (
    <div className="container">
      <input
        type="text"
        className="form-control mt-3"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="row">
        {data.map((item, index) => (
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
