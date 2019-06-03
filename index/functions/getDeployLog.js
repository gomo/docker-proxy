const config = require(`../configs/${process.env.USER}`)
const fs = require("fs")

class DeployLog {
  constructor(log_text){
    const chunks = log_text.split("\n")
    this.title = chunks.shift()
    this.body = chunks.join("\n").replace(/^\s+|\s+$/g, '')
  }

  has_error(){
    // メモリ不足でプロセスを強制終了すると`/root/deploy.bash: line 49:  4724 Killed`の様なログが出力されます。
    // https://unix.stackexchange.com/questions/184371/what-does-line-19-12364-killed-mean-in-crontab-error-message
    return this.body.indexOf('Deploy failed:') >= 0 || this.body.match(/\/root\/deploy\.bash: *line *[0-9]+: *[0-9]+ *Killed/)
  }
}

module.exports = (container_name) => {
  const logs = []
  const log_path = `${config.deploy_logs_path}/deploy@${container_name}.log`
  if(fs.existsSync(log_path)){
    fs.readFileSync(log_path, 'utf8').replace(/^\s+|\s+$/g, '').split("=============================================\n").filter(b => b !== '').forEach(block => {
      logs.push(new DeployLog(block))
    })
  }

  return logs
}