const { execSync } = require('child_process');
const _ = require('lodash');
const fs = require("fs")

exports.fetchDockerContainers = function() {
  const command = `docker ps --format '{"names": "{{.Names}}", "ports": "{{.Ports}}", "image": "{{.Image}}", "id": "{{.ID}}", "mounts": "{{.Mounts}}", "created_at": "{{.CreatedAt}}", "size": "{{.Size}}", "running_for": "{{.RunningFor}}"}'`
  const jsonString = `[${execSync(command).toString('utf-8').split("\n").filter(v => v).join(',')}]`
  return JSON.parse(jsonString).map(container => {
    // 80がマッピングされてるのポートを割り出す
    let matches = container.ports.match(/:([0-9]+)\->80\/tcp/)
    if(matches){
      container.http_port = matches[1]
    }

    //2019-05-16 15:25:05 +0900 JSTからタイムゾーンを除く
    matches = container.created_at.match(/(\d{4}\-\d{2}\-\d{2}\ \d{2}:\d{2}:\d{2})/)
    if(matches){
      container.created_at = matches[1]
    }

    return container
  })
}

exports.fetchDockerContainerInfo = function(container_name) {
  const command = `docker exec ${container_name} /bin/bash /root/info.bash`
  const jsonString = execSync(command).toString('utf-8')
  const info = JSON.parse(jsonString)
  info.repository_url = info.remote_url.replace(/:/, '/').replace(/^git@/, 'https://').replace(/\.git$/, '')
  return info
}