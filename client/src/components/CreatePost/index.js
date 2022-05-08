import { ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

import api from '../../services/api';
import { storage } from '../../services/firebase';

export default function CreatePost() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      if (title === '' || content === '') {
        setError('Title and content are required');
        return;
      }
      setError('');
      setLoading(true);
      const uploaded = await uploadImageAndVideo();
      await api.post('/posts', {
        title,
        content,
        image: uploaded[0] ? uploaded[0] : '',
        video: uploaded[1] ? uploaded[1] : '',
      });
      setLoading(false);
      setSuccess('Post created successfully. Redirecting...');
      setTimeout(() => {
        navigate(`/posts`);
      }, 3000);
    } catch (error) {
      setError('An unexpected error occurred');
    }
  };

  const uploadImageAndVideo = async () => {
    const uploaded = [];
    if (image) {
      const response = await uploadFile(image);
      uploaded.push(response.metadata.fullPath);
    }
    if (video) {
      const response = await uploadFile(video);
      uploaded.push(response.metadata.fullPath);
    }
    return uploaded;
  };

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const fileName = `${v4()}-${file.name}`;
      const fileRef = ref(storage, `posts/files/${fileName}`);
      return uploadBytes(fileRef, file);
    } catch (error) {
      setError(`An error occurred while uploading the file ${file.name}`);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form>
          <h3>Create post</h3>
          <div className="mb-3">
            <label>Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
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
            <label>Content</label>
            <textarea
              type="text"
              className="form-control"
              placeholder="Enter post content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Video</label>
            <input
              type="file"
              className="form-control"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </div>
          <div className="d-grid">
            {isLoading ? (
              <button className="btn btn-primary" type="button" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Loading...</span>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                type="button"
                className="btn btn-primary"
              >
                Submit
              </button>
            )}
            {success && (
              <div className="alert alert-success mt-3" role="alert">
                {success}
              </div>
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
