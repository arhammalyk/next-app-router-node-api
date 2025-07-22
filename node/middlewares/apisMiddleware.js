function checkAccess(req, res, next, jsonApis) {
  let url = req.url
    .replace(/^\/api\//, "") // remove /api/ if present
    .replace(/^\/+/, "") // remove any leading slashes
    .split("?")[0] // remove query params
  // will correctly log: login

  if (jsonApis.includes(url)) next()
  else {
    res.statusCode = 404
    return res.send({ message: 5068, err: { msg: "API ROUTE NOT FOUND" } })
  }
}

module.exports = checkAccess
