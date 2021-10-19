const express =require('express')
const {homepage} = require('../controllers/pagesController')

const router = express.Router()

router.get('/' , homepage)



module.exports = router