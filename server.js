const express = require("express")
const next = require("next")
const connectDB = require("./node/DB/connect")
const userRoutes = require("./node/routes/userRoutes")

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== "production"

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(async () => {
  await connectDB()
  const server = express()
  server.use(express.json())

  // Use user routes for /api
  server.use("/api", userRoutes)

  server.all("*", (req, res) => {
    return handle(req, res)
  })

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
