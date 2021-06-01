// eslint-disable-next-line import/order
const api = require('@opentelemetry/api')
const express = require('express')
const http = require('http')
const HttpStatus = require('http-status')

const { getAllBirds } = require('./service')

/**
 * @param {api.Tracer} tracer
 */
function createHttpServer(tracer) {
  const app = express()

  app.use(express.json())

  app.get('/ping', (_req, res) => {
    return res.status(HttpStatus.OK).send('pong')
  })

  app.get('/birds', async (_req, res) => {
    const currentSpan = api.getSpan(api.context.active())
    console.log(`traceid: ${currentSpan.context().traceId}`)
    const span = tracer.startSpan('getAllBirds()', {
      kind: api.SpanKind.SERVER,
    })

    api.context.with(api.setSpan(api.ROOT_CONTEXT, span), async () => {
      try {
        const birds = await getAllBirds()
        span.setStatus({ code: api.SpanStatusCode.OK })

        res.status(HttpStatus.OK).json({ birds })
      } catch (err) {
        span.setStatus({ code: api.SpanStatusCode.ERROR, message: err.message })
        res.status(HttpStatus.BAD_REQUEST).send({ message: err.message })
      }
      span.end()
    })
  })

  return http.createServer(app)
}

module.exports = createHttpServer
