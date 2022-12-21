const express = require('express')
const router = express.Router()
const {registerUser,loginUser,getMe} = require('../controllers/userController')
const {protect} = require('../middleware/authMidlleware')

router.post('/register', registerUser)
router.post('/', loginUser)
router.get('/me', protect ,getMe)

module.exports = router