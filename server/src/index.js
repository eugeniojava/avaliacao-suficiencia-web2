require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const API_PREFIX = process.env.API_PREFIX;
app.use(API_PREFIX, require('./route/postRoute'));
app.use(API_PREFIX, require('./route/uploadRoute'));
app.use(API_PREFIX, require('./route/userRoute'));
const PORT = process.env.PORT || 8080;

app.get('/api/auth', (request, response) => {
  const username = request.body.username;
  const user = { username };
  const accessToken = generateAccessToken(user);
  response.json({ accessToken });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
}

function authenticate(request, response, next) {
  const authorizationHeader = request.headers.authorization;
  const token = authorizationHeader && authorizationHeader.split(' ')[1];
  if (token == null) {
    return response.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      return response.sendStatus(403);
    }
    request.user = user;
    next();
  });
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
