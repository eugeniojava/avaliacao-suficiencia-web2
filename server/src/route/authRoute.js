const router = require('express').Router();
const authService = require('../service/authService');

router.post('/auth/login', async function (request, response, next) {
  try {
    const authenticated = await authService.login(
      request.body.login,
      request.body.password
    );
    response.json(authenticated);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
