const express = require("express");
const next = require("next");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  server.get("/api/getUser", (req, res) => {
    res.json({ name: "Arham" });
  });

  server.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      res.json({ success: true, message: "Login data received." });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
    }
  });

  server.use((req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
