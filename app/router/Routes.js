const express = require('express');
const controllers = require('../controllers/apiController') 

const router = express.Router();

// Pages
router
.route('/api/v1/users')
.post(controllers.addUsers)
.get(controllers.getAllUsers)

router
.route('/api/v1/user/:id')
.delete(controllers.deleteUser)
.put(controllers.updateUser)

// Api


module.exports = router;
