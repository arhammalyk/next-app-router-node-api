require("dotenv").config()

let config = require("config")
const express = require("express")
let fs = require("fs")
const next = require("next")
const connectDB = require("./node/DB/connect")
const userRoutes = require("./node/routes/userRoutes")
const { Server } = require("https")
const apisMiddleware = require("./node/middlewares/apisMiddleware")
const cors = require("cors")

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== "production"

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(async () => {
  await connectDB()
  const server = express()
  server.use(express.json())

  // Enable CORS for all routes
  server.use(cors())
  // Handle preflight OPTIONS requests for all routes
  server.options("*", cors())

  var apisContent = fs.readFileSync(config.apisFileName)
  var jsonApis = JSON.parse(apisContent)

  // Allowed Apis on this server
  // server.use(function (req, res, next) {
  //   apisMiddleware(req, res, next, jsonApis)
  // })

  // Use user routes for /api
  server.use("/api", userRoutes)

  server.all("*", (req, res) => {
    return handle(req, res)
  })

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
