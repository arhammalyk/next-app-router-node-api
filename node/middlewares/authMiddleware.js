const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next, roles, jsonAccess) {
  // token access
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" })
  }
  const token = authHeader.split(" ")[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded

    // role access
    let url = req.url

    url = url.replace("/api/", "")
    // Remove leading slashes
    url = url.replace(/^\/+/, "")
    let method = req.method

    if (jsonAccess[roles[decoded?.role]][method.toLowerCase()].includes(url))
      next()
    else return res.send({ message: 5022, errors: { msg: "Access Forbidden" } })
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" })
  }
}

module.exports = authMiddleware
