require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../service/userService');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const EXPIRES_IN = '1h';

exports.login = async function (login, password) {
  if (!login || !password) {
    throw new Error('Login and password are required');
  }
  const user = await userService.findByLogin(login);
  if (!bcrypt.compareSync(password, user.password)) {
    throw new Error('Bad credentials');
  }
  console.log(JSON.stringify(user));
  return {
    id: user.id,
    login: user.login,
    email: user.email,
    isAdmin: user.is_admin,
    accessToken: generateAccessToken({
      id: user.id,
      login: user.login,
      email: user.email,
    }),
  };
};

function generateAccessToken(user) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, {
    expiresIn: EXPIRES_IN,
  });
}

exports.authenticate = function (request, response, next) {
  const token =
    request.headers.authorization &&
    request.headers.authorization.split(' ')[1];
  if (!token) {
    throw new Error('No token provided');
  }
  jwt.verify(token, ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      throw new Error('Token is invalid');
    }
    request.user = user;
    next();
  });
};
