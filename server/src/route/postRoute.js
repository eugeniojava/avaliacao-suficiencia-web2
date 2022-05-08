const router = require('express').Router();
const postService = require('../service/postService');
const authenticate = require('../service/authService').authenticate;

router.get('/posts', async function (request, response, next) {
  try {
    let posts;
    if (request.query.filter) {
      posts = await postService.findByTitleAndContentLike(request.query.filter);
    } else if (request.query.author) {
      posts = await postService.findByAuthor(request.query.author);
    } else {
      posts = await postService.findAll();
    }
    response.json(posts);
  } catch (error) {
    next(error);
  }
});

router.post('/posts', authenticate, async function (request, response, next) {
  if (!request.body.title || !request.body.content) {
    response.status(400).json({ error: 'Title and content are required' });
  }
  const post = {
    title: request.body.title,
    content: request.body.content,
    userId: request.user.id,
    imageName: request.body.image,
    videoName: request.body.video,
  };
  try {
    const savedPost = await postService.save(post);
    response.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
});

router.put(
  '/posts/:postId',
  authenticate,
  async function (request, response, next) {
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
  }
);

router.delete(
  '/posts/:postId',
  authenticate,
  async function (request, response, next) {
    const postId = request.params.postId;
    try {
      await postService.deleteById(postId);
      response.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
