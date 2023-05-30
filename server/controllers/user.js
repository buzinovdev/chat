const User = require('../models/user.js')
const generateAccessToken = require('../services/generateAccessToken.js')

class user {
  async logReg(req, res) {
    try {
      const {login, name, color} = req.body.userData
      let user = await User.findOne({login})
      if (!user) {
        await User.create({login, name, color})
        user = await User.findOne({login})
      }
      const token = generateAccessToken(user._id, user.login)
      user = {
        _id: user.id,
        name: user.name,
        color: user.color
      }
      return res.json({user, token})
    } catch (e) {
      console.log(e)
      return res.json({
        status: 400,
        msgActive: true,
        msgType: 'danger',
        msg: 'Ошибка во время аутентификации',
        token: ''
      })
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find()
      return res.json(users)
    } catch (e) {
      console.log(e)
      return res.json({
        status: 400,
        msgActive: true,
        msgType: 'danger',
        msg: 'Ошибка при получении списка пользователей',
        token: ''
      })
    }
  }
}

module.exports = new user()
