const express = require('express');
const app = express();
const path = require('path');
const { fetchDockerContainers, fetchDockerContainerInfo } = require('../lib/util')
const IntlRelativeFormat = require('intl-relativeformat')
const format = require('date-fns/format')

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));
app.use('/node-static', express.static(path.join(__dirname, '/public')))

const relativeFormat = new IntlRelativeFormat('ja')


app.use((req, res, next) => {
  res.render('index.ejs', {
    containers: fetchDockerContainers(),
    relativeFormat: relativeFormat,
    format: format,
    fetchDockerContainerInfo: fetchDockerContainerInfo
  })
})

app.listen(8080)