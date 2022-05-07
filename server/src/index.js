require('dotenv').config();
const express = require('express');
const cors = require('cors');

const API_PORT = process.env.API_PORT || 8080;
const API_PREFIX = process.env.API_PREFIX;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(API_PREFIX, require('./route/postRoute'));
app.use(API_PREFIX, require('./route/userRoute'));
app.use(API_PREFIX, require('./route/uploadRoute'));

app.use(function (error, request, response, next) {
  if (error.message === 'Post already exists') {
    return response.status(409).send(error.message);
  }
  if (error.message === 'Post not found') {
    return response.status(404).send(error.message);
  }
  response.status(500).send(error.message);
});

app.listen(API_PORT, () => {
  console.log(`Listening on port ${API_PORT}`);
});
