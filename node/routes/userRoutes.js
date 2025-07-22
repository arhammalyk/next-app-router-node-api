const express = require("express")
let fs = require("fs")
const router = express.Router()
const {
  getUsers,
  updateUser,
  login,
  signup,
  addCredits,
} = require("../controllers/userController")
const authMiddleware = require("../middlewares/authMiddleware")

const rolesConfig = fs.readFileSync("config/settings/roles/roles.json")
var rolesConfigContent = JSON.parse(rolesConfig)

const apiPermissions = fs.readFileSync("config/settings/apis/general.json")
var apiPermissionsContent = JSON.parse(apiPermissions)

router.post("/signup", signup)
router.post("/login", login)

// Acceess middleware
router.use(function (req, res, next) {
  authMiddleware(req, res, next, rolesConfigContent, apiPermissionsContent)
})

router.get("/getUsers", getUsers)
router.get("/getUsers/:id", getUsers)
router.put("/updateUser", updateUser)
router.post("/addCredits", addCredits)

module.exports = router
