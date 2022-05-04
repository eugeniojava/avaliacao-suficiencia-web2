const userData = require('../data/userData');
const bcrypt = require('bcrypt');

exports.create = async function (user) {
  user.password = await bcrypt.hash(user.password, 10);
  const user2 = await userData.create(user);
  console.log(user);
  console.log(user2);
  return user2;
};
