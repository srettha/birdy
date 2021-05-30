/* eslint-disable import/order */

const tracer = require('../../tracer')('birdy')
const server = require('./server')(tracer)

const PORT = 5001

server.listen(PORT, () => {
  console.log(`Birdy is listening on port ${PORT}`)
})
