const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController.js');
const passport = require('passport');

router.get('/', messageController.postMessageGet);

module.exports = router;
