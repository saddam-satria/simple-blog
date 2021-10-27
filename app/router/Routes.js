const express = require('express');
const userControllers = require('../controllers/userControllers');
const authorsController = require('../controllers/authorsController');
const postsController = require('../controllers/postsController');
const rateLimiterRequest = require('express-rate-limit');
const authMiddleware = require('../middleware/auth');
const helpers = require('../helpers/users');
const multer = require('multer');

const router = express.Router();

// Brute force handler
const rateLimiter = rateLimiterRequest({
  windowMs: 1 * 60 * 1000,
  max: 3,
  handler: (_req, res) => {
    res.json({ status: 'error', msg: 'To many request' }).status(403);
  },
});

// Upload image
const optionUserImage = helpers.uploadUserImageOption();
const uploadImageUser = multer({ storage: optionUserImage.storage, fileFilter: optionUserImage.filterFile });

const optionPostImage = helpers.uploadPostImageOption();
const uploadImagePost = multer({ storage: optionPostImage.storage, fileFilter: optionPostImage.filterFile });
// Api

// users
// Admin do
router.route('/api/v1/users').post(rateLimiter, userControllers.addUser).get(userControllers.getAllUsers);
router.route('/api/v1/user/:id').delete(userControllers.deleteUser).put(uploadImageUser.single('image'), userControllers.updateUser).get(userControllers.detailUser);
// Not need this up

router.post('/api/v1/user/login', rateLimiter, userControllers.loginUser);
router.get('/api/v1/revoketoken', authMiddleware.auth, userControllers.revokeAccessToken);

// Author
router.route('/api/v1/authors').post(authMiddleware.auth, authorsController.addAuthor).get(authorsController.getAuthors);
router.route('/api/v1/author/:id').delete(authMiddleware.auth, authorsController.deleteAuthor).put(authMiddleware.auth, authorsController.updateAuthors).get(authMiddleware.auth, authorsController.getDetailAuthor);

// Posts
router.route('/api/v1/posts').post(authMiddleware.auth, uploadImagePost.single('image'), postsController.addPost).get(postsController.getPosts);
router.route('/api/v1/post/:id').delete(authMiddleware.auth, postsController.deletePost).put(authMiddleware.auth, postsController.updatePost).get(postsController.detailPost);

module.exports = router;
