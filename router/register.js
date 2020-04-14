const express = require('express');
const register = require('../controller/user');
const router = express.Router();

router.post('/admin/register',register.index);

module.exports = router;