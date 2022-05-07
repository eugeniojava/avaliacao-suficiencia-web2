const router = require('express').Router();
const authService = require('../service/authService');

router.get('/auth/login', async function (request, response) {
  const { login, password } = request.body;
  if (!login || !password) {
    return response.status(400).json({ message: 'Invalid fields sent' });
  }
  const user = await authService.login(login, password);
  if (!user) {
    return response.status(401).json({ message: 'Invalid credentials' });
  }
  const accessToken = authService.generateAccessToken(user);
  response.json({ accessToken });
});

module.exports = router;
