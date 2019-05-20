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
  const containers = fetchDockerContainers()
  const using_ports = containers.map(c => parseInt(c.http_port, 10))
  const avaiable_ports = []
  let port = Math.min.apply(null, using_ports)

  while(true){
    ++port//Math.minで取ってるので最初のは必ず使用中
    if(!using_ports.includes(port)){
      avaiable_ports.push(port)
      if(avaiable_ports.length >= 1) break;
    }
  }

  res.render('index.ejs', {
    containers: containers,
    relativeFormat: relativeFormat,
    format: format,
    fetchDockerContainerInfo: fetchDockerContainerInfo,
    avaiable_ports: avaiable_ports
  })
})

app.listen(8080)