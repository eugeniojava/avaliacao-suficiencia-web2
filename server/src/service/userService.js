const bcrypt = require('bcrypt');
const userData = require('../data/userData');

const ENCRYPTION_SALT = 10;

exports.findByLogin = async function (login) {
  const user = await userData.findByLogin(login);
  if (!user) throw new Error('User not found');
  return user;
};

exports.save = async function (user) {
  if (!user.login || !user.email || !user.password) {
    throw new Error('Login, email and password are required');
  }
  const existingUserByLogin = await userData.existsByLogin(user.login);
  if (existingUserByLogin) throw new Error('Login already registered');
  const existingUserByEmail = await userData.existsByEmail(user.email);
  if (existingUserByEmail) throw new Error('Email already registered');
  user.password = await bcrypt.hash(user.password, ENCRYPTION_SALT);
  return userData.save(user);
};

exports.deleteByLogin = function (login) {
  return userData.deleteByLogin(login);
};
