const express = require('express');
const app = express();
const path = require('path');
const { fetchDockerContainers } = require('../lib/util')
const IntlRelativeFormat = require('intl-relativeformat')
const format = require('date-fns/format')

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));

const relativeFormat = new IntlRelativeFormat('ja')

app.use((req, res, next) => {
  res.render('index.ejs', {
    containers: fetchDockerContainers(),
    relativeFormat: relativeFormat,
    format: format
  })
})

app.listen(8080)