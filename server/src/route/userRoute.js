const router = require('express').Router();
const userService = require('../service/userService');

router.post('/users', async function (request, response, next) {
  const newUser = {
    login: request.body.login,
    email: request.body.email,
    password: request.body.password,
  };
  try {
    const savedUser = await userService.save(newUser);
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
