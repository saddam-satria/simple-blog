const express = require('express');
const userControllers = require('../controllers/userControllers');
const authorsController = require('../controllers/authorsController')
const rateLimiterRequest = require('express-rate-limit');

const router = express.Router();

// Brute force handler
const loginRateLimiter = rateLimiterRequest({
  windowMs: 5 * 60 * 1000,
  max: 50,
  handler: (_req, res) => {
    res.json({ status: 'error', msg: 'to many request' });
  },
});

const registerRateLimiter = rateLimiterRequest({
  windowMs: 5 * 60 * 60 * 1000,
  max: 5,
  handler: (_req, res) => {
    res.json({ status: 'error', msg: 'one devices could register 5 users per 5 hours' });
  },
});
// Api

// users
router.route('/api/v1/users').post(registerRateLimiter, userControllers.addUsers).get(userControllers.getAllUsers);
router.route('/api/v1/user/:id').delete(userControllers.deleteUser).put(userControllers.updateUser).get(userControllers.logoutUser);
router.post('/api/v1/user/login', loginRateLimiter, userControllers.loginUser);
router.get('/api/v1/users/:id', userControllers.detailUser)

// Author
router.route('/api/v1/authors').post(authorsController.addAuthor).get(authorsController.getAuthors)
router.route('/api/v1/author/:id').delete(authorsController.deleteAuthor)

module.exports = router;
