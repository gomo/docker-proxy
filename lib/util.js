const { execSync } = require('child_process');

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

    // 日付から
    return container
  })
}

exports.fetchDockerHttpPorts = function() {
  return exports.fetchDockerContainers().reduce((obj, container) => {
    const port = container.ports.replace(/\->[0-9]+\/tcp/, '').split(':')[1]
    obj[container.names] = http_port
    return obj
  }, {})
}