const jwt = require('jsonwebtoken')
const generateAccessToken = (id, login) => {
  const payload = {id, login}
  return jwt.sign(payload, 'chat', {expiresIn: "24h"})
}
module.exports = generateAccessToken
