const express = require('express')
const router = express.Router()
const controller = require('../controllers/message')
router.post('/create', controller.createChat)
router.post('/used', controller.getActiveChats)
router.post('/send', controller.sendMessage)
module.exports = router
