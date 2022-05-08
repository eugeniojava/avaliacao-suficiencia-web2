const router = require('express').Router();
const userService = require('../service/userService');

router.get('/users', async function (request, response, next) {
  try {
    let users;
    if (request.query.filter && request.query.filter === 'having-post') {
      users = await userService.findAllHavingPost();
    } else {
      users = await userService.findAll();
    }
    response.json(users);
  } catch (error) {
    next(error);
  }
});

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

router.put('/users/:userId', async function (request, response, next) {
  try {
    await userService.updateById(request.params.userId, request.body);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
