const router = require('express').Router();
const postService = require('../service/postService');

router.get('/posts', async function (request, response) {
  const posts = await postService.findAll();
  return response.json(posts);
});

router.post('/posts', async function (request, response) {});

module.exports = router;
