const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model

const Users = new Schema({
  login: {type: String, unique: true, required: true},
  name: {type: String, required: true},
  color: {type: String, required: true}
})
Users.index({login: 1});
module.exports = model("User", Users);
