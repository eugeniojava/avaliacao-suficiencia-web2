const router = require('express').Router();

router.get('/posts', async function (request, response) {
  response.json([
    {
      id: 1,
      title: 'Post 1',
      body: 'This is post 1',
    },
    {
      id: 2,
      title: 'Post 2',
      body: 'This is post 2',
    },
    {
      id: 3,
      title: 'Post 3',
      body: 'This is post 3',
    },
    {
      id: 4,
      title: 'Post 4',
      body: 'This is post 4',
    },
    {
      id: 5,
      title: 'Post 5',
      body: 'This is post 5',
    },
  ]);
});

router.get('/posts/:id', async function (request, response) {});

router.post('/posts', async function (request, response) {});

router.put('/posts/:id', async function (request, response) {});

router.delete('/posts/:id', async function (request, response) {});

module.exports = router;
