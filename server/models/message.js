const mongoose = require('mongoose')
const {type} = require("os");
const Schema = mongoose.Schema
const model = mongoose.model
const MessageBody = new Schema(
  {
    mid: Number,
    uid: String,
    created: String,
    msg: String,
    unread: String
  }
)
const MessageItem = new Schema(
  {
    name: String,
    color: String,
    chatId: String,
    msgs: [MessageBody],
    lastMsg: {
      uid: String,
      created: String,
      msg: String
    }
  }
)
const MessageSchema = new Schema(
  {
    uid: String,
    chats: [MessageItem]
  }
)

module.exports = model('Message', MessageSchema);
