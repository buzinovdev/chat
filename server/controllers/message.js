const Message = require('../models/message.js')
const User = require("../models/user");

const creatChatHandler = async (initiator, companion) => {
  const chat = {chatId: companion, msgs: [], lastMsg: {uid: '', created: '', msg: ''}}
  const getChats = await Message.findOne({uid: initiator})
  if (getChats) { // Если у пользователя есть чаты
    const searchChatIndex = getChats.chats.findIndex(el => el.chatId === companion)
    if (searchChatIndex === -1) { // Если у пользователя нет чата с этим человеком
      await Message.findOneAndUpdate({uid: initiator}, {$push: {chats: chat}})
    }
  } else { // Если у пользователя вообще нет чатов
    await Message.create({uid: initiator, chats: {...chat}})
  }
}
const sendMessageHandler = async (initiator, companion, message, unread = '')=>{
  await Message.findOne({uid:initiator}).then(doc => {
    const chat = doc.chats.find(el => el.chatId === companion)
    message.unread = unread.length > 0 ? unread : ''
    chat.msgs.push(message)
    chat.lastMsg = {uid: message.uid, created: message.created, msg: message.msg}
    doc.save()
  })
}

class message {
  async createChat(req, res) {
    const {meId, comId} = req.body
    try {
      await creatChatHandler(comId, meId) // создание у компаньона
      return await creatChatHandler(meId, comId) // создание у инициатора
    } catch (e) {
      console.log(e)
    }
  }

  async sendMessage(req, res) {
    const {uid, chatId, message} = req.body
    try {
      await creatChatHandler(uid, chatId) // создание у инициатора
      await creatChatHandler(chatId, uid) // создание у компаньона
      await sendMessageHandler(uid, chatId, message) // запись в инициатора
      await sendMessageHandler(chatId, uid, message, uid) // запись в компаньона
      return res.json()
    } catch (e) {
      console.log(e)
      return res.json({
        status: 400,
        msgActive: true,
        msgType: 'danger',
        msg: 'Ошибка при отправке сообщения',
        token: ''
      })
    }
  }

  async getActiveChats(req, res) {
    try {
      const {uid} = req.body
      const chatList = await Message.findOne({uid: uid})
      const list = chatList ? chatList.chats : []
      if (list.length > 0) {
        const ids = list.map(el => el.chatId)
        const users = await User.find({_id: {$in: ids}})
        list.forEach(item => {
          const find = users.find(el => el._id.toString() === item.chatId)
          item.name = find.name
          item.color = find.color
        })
      }
      return res.json(list)
    } catch (e) {
      console.log(e)
      return res.json({
        status: 400,
        msgActive: true,
        msgType: 'danger',
        msg: 'Ошибка при получении списка чатов',
        token: ''
      })
    }
  }
}

module.exports = new message()
