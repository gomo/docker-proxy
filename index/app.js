const express = require('express');
const path = require('path');

const app = express();
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));

const log = require('../lib/log')
const index = require('./routes/index');

app.use(log)
app.use('/docker-proxy/static', express.static(path.join(__dirname, '/public')))
app.use(index)

app.listen(8080)