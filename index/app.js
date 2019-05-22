const express = require('express');
const path = require('path');
const fs = require("fs")

const app = express();
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));

app.use(require('../lib/log'))
app.use('/docker-proxy/static', express.static(path.join(__dirname, '/public')))

const pages = [

]

pages.forEach(page => app.use(`/docker-proxy/${page}`, require(`./routes/${page}`)))
app.use('/favicon.ico', (req, res, next) => {
  var buf = fs.readFileSync(path.join(__dirname, '/public/favicon.ico'));
  res.writeHead(200, {"Content-Type": "image/vnd.microsoft.icon"});
  res.end(buf);
})
app.use(require('./routes/index'))

app.listen(8080)