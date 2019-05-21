const _ = require('lodash');
const config = require(`../configs/${process.env.USER}`)
const fs = require("fs")

class DeployLog {
  constructor(log_text){
    const chunks = log_text.split("\n")
    this.title = chunks.shift()
    this.body = chunks.join("\n")
  }

  has_error(){
    return this.body.indexOf('Deploy failed:') >= 0
  }
}

module.exports = (container_name) => {
  const logs = []
  const log_path = `${config.deploy_logs_path}/${container_name}.log`
  if(fs.existsSync(log_path)){
    fs.readFileSync(log_path, 'utf8').replace(/^\s+|\s+$/g, '').split("=============================================\n").filter(b => b !== '').forEach(block => {
      logs.push(new DeployLog(block))
    })
  }

  return logs
}