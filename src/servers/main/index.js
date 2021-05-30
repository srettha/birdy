/* eslint-disable import/order */

const tracer = require('../../tracer')('server')
const server = require('./server')(tracer)

const PORT = 5000

server.listen(PORT, () => {
  console.log(`Main is listening on port ${PORT}`)
})
