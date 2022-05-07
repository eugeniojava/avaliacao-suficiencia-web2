const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userData = require('../data/userData');

exports.login = async function (login, password) {
  const user = await userData.findByLogin(login);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return null;
  }
  return user;
};

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
