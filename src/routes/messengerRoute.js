const express = require('express');
const router = express.Router();
const {getFriends, messageUploadDB, messageGet, ImageMessagrSend} = require('../controllers/messengerController')
const {authMiddleware} = require('../middleware/authMiddleware')



router.get('/get-friends', authMiddleware, getFriends)
router.post('/send-message', authMiddleware, messageUploadDB)
router.post('/image-message-send', authMiddleware, ImageMessagrSend)
router.get('/get-message/:id', authMiddleware, messageGet)

module.exports = router