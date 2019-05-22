const express = require('express');
const path = require('path');

const app = express();
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));

// app.use(require('../lib/log'))
app.use('/docker-proxy/static', express.static(path.join(__dirname, '/public')))

const pages = [
  'ajax/deploy_info'
]

pages.forEach(page => app.use(`/docker-proxy/${page}`, require(`./routes/${page}`)))
app.use(require('./routes/index'))

app.listen(8080)