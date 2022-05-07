// const crypto = require('crypto');
// const axios = require('axios');
// const authService = require('../service/authService');
// const userService = require('../service/userService');

// const API_PORT = process.env.API_PORT || 8080;
// const API_URL = `http://localhost:${API_PORT}/api/v1`;

// const generateRandomString = function () {
//   return crypto.randomBytes(20).toString('hex');
// };

// const request = function (url, method, data) {
//   return axios({ url, method, data, validateStatus: false });
// };

// test('Should generate an access token', async function () {
//   const user = {
//     login: 'test',
//     email: 'test@test.com',
//     password: 'test',
//   };

//   await userService.save(user);
//   const response = await request(`${API_URL}/auth/token`, 'POST', {
// });

// test('Should save a user', async function () {
//   const user = {
//     login: generateRandomString(),
//     email: generateRandomString(),
//     password: generateRandomString(),
//   };

//   const response = await request(`${API_URL}/users`, 'POST', user);

//   expect(response.status).toBe(201);
//   expect(response.data.login).toBe(user.login);
//   expect(response.data.email).toBe(user.email);
//   await userService.deleteByLogin(response.data.login);
// });

// test('Should not save a user when login already exists', async function () {
//   const user1 = {
//     login: 'login',
//     email: generateRandomString(),
//     password: generateRandomString(),
//   };
//   const user2 = {
//     login: 'login',
//     email: generateRandomString(),
//     password: generateRandomString(),
//   };

//   const response1 = await request(`${API_URL}/users`, 'POST', user1);
//   const response2 = await request(`${API_URL}/users`, 'POST', user2);

//   expect(response2.status).toBe(409);
//   expect(response2.data.error).toBe('Login already registered');
//   await userService.deleteByLogin(response1.data.login);
// });

// test('Should not save a user when email already exists', async function () {
//   const user1 = {
//     login: generateRandomString(),
//     email: 'email',
//     password: generateRandomString(),
//   };
//   const user2 = {
//     login: generateRandomString(),
//     email: 'email',
//     password: generateRandomString(),
//   };

//   const response1 = await request(`${API_URL}/users`, 'POST', user1);
//   const response2 = await request(`${API_URL}/users`, 'POST', user2);

//   expect(response2.status).toBe(409);
//   expect(response2.data.error).toBe('Email already registered');
//   await userService.deleteByLogin(response1.data.login);
// });

// test('Should not save a user when login field is not passed', async function () {
//   const user = {
//     email: generateRandomString(),
//     password: generateRandomString(),
//   };

//   const response = await request(`${API_URL}/users`, 'POST', user);

//   expect(response.status).toBe(400);
//   expect(response.data.error).toBe('Login, email and password are required');
// });

// test('Should not save a user when email field is not passed', async function () {
//   const user = {
//     login: generateRandomString(),
//     password: generateRandomString(),
//   };

//   const response = await request(`${API_URL}/users`, 'POST', user);

//   expect(response.status).toBe(400);
//   expect(response.data.error).toBe('Login, email and password are required');
// });

// test('Should not save a user when password field is not passed', async function () {
//   const user = {
//     login: generateRandomString(),
//     email: generateRandomString(),
//   };

//   const response = await request(`${API_URL}/users`, 'POST', user);

//   expect(response.status).toBe(400);
//   expect(response.data.error).toBe('Login, email and password are required');
// });
