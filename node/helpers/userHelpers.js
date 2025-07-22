const jwt = require("jsonwebtoken")

function getJwtToken(user) {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET)
  return token
}

module.exports = { getJwtToken }
