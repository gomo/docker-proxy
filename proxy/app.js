const express = require('express');
const proxy = require('http-proxy-middleware');
const { execSync } = require('child_process');

const containers = execSync('docker ps --format "{{.Names}}@@@@{{.Ports}}"').toString('utf-8').split("\n").filter(v => v).reduce((obj, value) => {
  const chunk = value.split('@@@@')
  const container_name = chunk[0]
  const port = chunk[1].replace(/\->[0-9]+\/tcp/, '').split(':')[1]
  obj[container_name] = port
  return obj
}, {})

const app = express();

app.use(
  proxy({ target: 'http://www.example.org', router: (req) => {
    const container_name = req.headers.host.split('.')[0];
    return `http://127.0.0.1:${containers[container_name]||8080}/`
  }})
);
app.listen(80)