import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import api from '../../services/api';
import { storage } from '../../services/firebase';

export default function Post() {
  const { state } = useLocation();
  const { post } = state;
  const [isLoading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/posts/${post.id}/media`);
        setImage(
          await getDownloadURL(ref(storage, response.data[0].imagePath))
        );
        setVideo(
          await getDownloadURL(ref(storage, response.data[0].videoPath))
        );
      } catch (error) {}
    };
    setLoading(true);
    fetchData();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [post]);

  return (
    <div className="container">
      {isLoading ? (
        <div className="d-flex justify-content-center mt-3">
          <div className="spinner-border text-light" role="status"></div>
        </div>
      ) : (
        <div className="card m-3">
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            {image && (
              <img src={image} alt="Post" className="img-fluid post-image" />
            )}
            <p className="card-text">By: {post.login}</p>
            <p className="card-text">{post.content}</p>
            {video && (
              <video src={video} className="img-fluid post-image" controls />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
