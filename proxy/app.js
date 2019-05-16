const express = require('express');
const proxy = require('http-proxy-middleware');
const { fetchDockerContainers } = require('../lib/util')

const app = express();

app.use(
  proxy({ target: 'http://www.example.org', router: (req) => {
    const container_name = req.headers.host.split('.')[0]
    const container = fetchDockerContainers().find(c => c.names == container_name)
    return `http://127.0.0.1:${container ? container.http_port : '8080'}/`
  }})
);
app.listen(80)