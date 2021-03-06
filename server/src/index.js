require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 8080;
const API_PREFIX = process.env.API_PREFIX;
const ENVIRONMENT = process.env.NODE_ENV;
const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(API_PREFIX, require('./route/authRoute'));

app.use(API_PREFIX, require('./route/postRoute'));

app.use(API_PREFIX, require('./route/userRoute'));

if (ENVIRONMENT === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, '..', 'build')));
  app.get('/*', (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });
}

app.use(function (error, request, response, next) {
  if (
    error.message === 'Login already registered' ||
    error.message === 'Email already registered' ||
    error.message === 'Post with this title already exists'
  ) {
    return response.status(409).json({ error: error.message });
  }
  if (
    error.message === 'Post not found' ||
    error.message === 'User not found'
  ) {
    return response.status(404).json({ error: error.message });
  }
  if (error.message === 'Invalid token') {
    return response.status(403).json({ error: error.message });
  }
  if (
    error.message === 'Bad credentials' ||
    error.message === 'No token provided'
  ) {
    return response.status(401).json({ error: error.message });
  }
  if (error.message === 'Login, email and password are required') {
    return response.status(400).json({ error: error.message });
  }
  response.status(500).json({ error: error.message });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
