const express = require("express")
const router = express.Router()
const {
  getUser,
  updateUser,
  login,
  signup,
} = require("../controllers/userController")
const authMiddleware = require("../middlewares/authMiddleware")

router.post("/signup", signup)
router.get("/getUser", authMiddleware, getUser)
router.post("/updateUser", authMiddleware, updateUser)
router.post("/login", login)

module.exports = router
