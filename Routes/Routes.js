const express = require('express');
const router = express.Router();
const { login, signup } = require('../Controllers/UserControllers.js');
const verifyToken = require('../Middlewares/VerifyToken.js');

router.post('/login',login)
router.post('/signup',signup)
module.exports = router