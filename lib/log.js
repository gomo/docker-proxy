const format = require('date-fns/format')

module.exports = (req, res, next) => {
  console.log(`${format(Date.now(), 'yyyy-M-d HH:mm:ss')} ${req.method} ${req.url} ${req.headers.referer} ${req.headers['user-agent']}`)
  next()
}