const router = require('express').Router();
const userService = require('../service/userService');

router.post('/users', async function (request, response) {
  const { login, email, password } = request.body;
  if (!login || !email || !password) {
    return response.status(400).json({ message: 'Invalid fields sent' });
  }
  const toBeSaved = { login, email, password };
  userService.create(toBeSaved).then((user) => response.status(201).send(user));
});

module.exports = router;
