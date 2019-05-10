var express = require('express');
var proxy = require('http-proxy-middleware');
const { execSync } = require('child_process');
console.log(execSync('docker ps').toString('utf-8'))
var app = express();

app.use(
  proxy({ target: 'http://www.example.org', router: (req) => {
    return 'http://127.0.0.1:3000/'
  }})
);
app.listen(80);