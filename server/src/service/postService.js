const postData = require('../data/postData');

exports.findAll = function () {
  return postData.findAll();
};

exports.findById = async function (postId) {
  const post = await postData.findById(postId);
  if (!post) throw new Error('Post not found');
  return post;
};

exports.save = async function (post) {
  const existingPost = await postData.findByTitle(post.title);
  if (existingPost) throw new Error('Post with this title already exists');
  return postData.save(post);
};

exports.updateById = async function (postId, post) {
  await exports.findById(postId);
  return postData.updateById(postId, post);
};

exports.deleteById = function (postId) {
  return postData.deleteById(postId);
};
