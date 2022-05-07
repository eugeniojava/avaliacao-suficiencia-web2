const bcrypt = require('bcrypt');
const userData = require('../data/userData');

exports.create = async function (user) {
  user.password = await bcrypt.hash(user.password, 10);
  return userData.create(user);
};
