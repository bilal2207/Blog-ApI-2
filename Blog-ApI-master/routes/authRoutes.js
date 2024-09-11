const express = require('express')
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');


const {register, login, getProfile} = require('../controllers/authController')



router.post('/login', login)
router.post('/register', register)
router.get('/get-profile', authenticateToken, getProfile)


module.exports = router