const crypto = require('crypto');
const axios = require('axios');
const postService = require('../service/postService');
const userService = require('../service/userService');

const API_PORT = process.env.API_PORT || 8080;
const API_URL = `http://localhost:${API_PORT}/api/v1`;

const generateRandomString = function () {
  return crypto.randomBytes(20).toString('hex');
};

const request = function (url, method, data) {
  return axios({ url, method, data, validateStatus: false });
};

test('Should find all posts', async function () {
  const user = await userService.save({
    login: generateRandomString(),
    email: generateRandomString() + '@gmail.com',
    password: generateRandomString(),
  });
  console.log(user);
  const post1 = await postService.save({
    title: generateRandomString(),
    content: generateRandomString(),
    userId: user.id,
  });
  const post2 = await postService.save({
    title: generateRandomString(),
    content: generateRandomString(),
    userId: user.id,
  });
  const post3 = await postService.save({
    title: generateRandomString(),
    content: generateRandomString(),
    userId: user.id,
  });

  const response = await request(`${API_URL}/posts`, 'GET');

  expect(response.status).toBe(200);
  expect(response.data).toHaveLength(3);
  await postService.deleteById(post1.id);
  await postService.deleteById(post2.id);
  await postService.deleteById(post3.id);
});

test('Should save a post', async function () {
  const post = {
    title: generateRandomString(),
    content: generateRandomString(),
  };

  const response = await request(`${API_URL}/posts`, 'POST', post);

  expect(response.status).toBe(201);
  expect(response.data.title).toBe(post.title);
  expect(response.data.content).toBe(post.content);
  await postService.deleteById(response.data.id);
});

test('Should not save a post when title already exists', async function () {
  const post = {
    title: generateRandomString(),
    content: generateRandomString(),
  };

  const response1 = await request(`${API_URL}/posts`, 'POST', post);
  const response2 = await request(`${API_URL}/posts`, 'POST', post);

  expect(response2.status).toBe(409);
  expect(response2.data.error).toBe('Post with this title already exists');
  await postService.deleteById(response1.data.id);
});

test('Should update a post', async function () {
  const post = await postService.save({
    title: generateRandomString(),
    content: generateRandomString(),
  });
  post.title = generateRandomString();
  post.content = generateRandomString();

  const response = await request(`${API_URL}/posts/${post.id}`, 'PUT', {
    title: post.title,
    content: post.content,
  });
  const updatedPost = await postService.findById(post.id);

  expect(response.status).toBe(204);
  expect(updatedPost.title).toBe(post.title);
  expect(updatedPost.content).toBe(post.content);
  await postService.deleteById(post.id);
});

test('Should not update a post when it does not exist', async function () {
  const post = {
    id: 1,
    title: generateRandomString(),
    content: generateRandomString(),
  };

  const response = await request(`${API_URL}/posts/${post.id}`, 'PUT', post);

  expect(response.status).toBe(404);
  expect(response.data.error).toBe('Post not found');
});

test('Should delete a post', async function () {
  const post = await postService.save({
    title: generateRandomString(),
    content: generateRandomString(),
  });

  const response = await request(`${API_URL}/posts/${post.id}`, 'DELETE');
  const posts = await postService.findAll();

  expect(response.status).toBe(204);
  expect(posts).toHaveLength(0);
});
