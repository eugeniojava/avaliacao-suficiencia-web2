const router = require('express').Router();
const postService = require('../service/postService');

router.get('/posts', async function (request, response, next) {
  try {
    const posts = await postService.findAll();
    response.json(posts);
  } catch (error) {
    next(error);
  }
});

router.post('/posts', async function (request, response, next) {
  if (!request.body.title || !request.body.content) {
    response.status(400).json({ error: 'Title and content are required' });
  }
  const post = request.body;
  try {
    const savedPost = await postService.save(post);
    response.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
});

router.put('/posts/:postId', async function (request, response, next) {
  const postId = request.params.postId;
  if (!postId) response.status(400).json({ error: 'Post id is required' });
  const post = request.body;
  if (!post.title || !post.content) {
    response.status(400).json({ error: 'Title and content are required' });
  }
  try {
    await postService.updateById(postId, post);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.delete('/posts/:postId', async function (request, response, next) {
  const postId = request.params.postId;
  try {
    await postService.deleteById(postId);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
