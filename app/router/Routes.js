const express = require('express');
const userControllers = require('../controllers/userControllers');

const router = express.Router();

// Api
// users
router.route('/api/v1/users').post(userControllers.addUsers).get(userControllers.getAllUsers);
router.route('/api/v1/user/:id').delete(userControllers.deleteUser).put(userControllers.updateUser).get(userControllers.logoutUser)
router.post('/api/v1/user/login', userControllers.loginUser)

// Author

module.exports = router;
