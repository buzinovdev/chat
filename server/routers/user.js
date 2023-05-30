const express = require('express')
const router = express.Router()
const controller = require('../controllers/user')
router.post('/login', controller.logReg)
router.get('/get', controller.getUsers)
module.exports = router
