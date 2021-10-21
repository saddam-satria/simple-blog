const express = require('express');
const userControllers = require('../controllers/userControllers');
const authorsController = require('../controllers/authorsController');
const postsController = require('../controllers/postsController');
const authMiddleware = require('../middleware/auth');

const rateLimiterRequest = require('express-rate-limit');

const router = express.Router();

// Brute force handler
const loginRateLimiter = rateLimiterRequest({
  windowMs: 1 * 60 * 1000,
  max: 3,
  handler: (_req, res) => {
    res.json({ status: 'error', msg: 'To many request' });
  },
});

const registerRateLimiter = rateLimiterRequest({
  windowMs: 1 * 60 * 1000,
  max: 3,
  handler: (_req, res) => {
    res.json({ status: 'error', msg: 'To many request' });
  },
});
// Api

// users
router.route('/api/v1/users').post(registerRateLimiter, authMiddleware, userControllers.addUser).get(userControllers.getAllUsers);
router.route('/api/v1/user/:id').delete(userControllers.deleteUser).put(userControllers.updateUser).get(userControllers.logoutUser);
router.post('/api/v1/user/login', loginRateLimiter, userControllers.loginUser);
router.get('/api/v1/users/:id', userControllers.detailUser);

// Author
router.route('/api/v1/authors').post(authorsController.addAuthor).get(authorsController.getAuthors);
router.route('/api/v1/author/:id').delete(authorsController.deleteAuthor).put(authorsController.updateAuthors).get(authorsController.getDetailAuthor);

// Posts
router.route('/api/v1/posts').post(postsController.addPost);
router.get('/api/v1/posts/:limit', postsController.getPosts);
router.route('/api/v1/post/:id').delete(postsController.deletePost).put(postsController.updatePost);

module.exports = router;
