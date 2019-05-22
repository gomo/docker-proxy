const express = require('express')
const router = express.Router()
const getDeployLog = require('../../functions/getDeployLog')
const config = require(`../../configs/${process.env.USER}`)
const fs = require("fs")

//getの例
router.get(/.*/, (req, res, next) => {
  const result = []
  req.query.names.split(',').forEach(container_name => {
    const temp = {logs: [], name: container_name }

    getDeployLog(container_name).forEach(log => {
      temp.logs.push({
        title: log.title,
        body: log.body
      })
    })

    const pid_path = `${config.deploy_pids_path}/${container_name}.log`
    temp.is_running = fs.existsSync(pid_path)

    result.push(temp)
  })
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(result));
});

module.exports = router