// eslint-disable-next-line import/order

const api = require('@opentelemetry/api')
const express = require('express')
const http = require('http')
const HttpStatus = require('http-status')

const apolloServer = require('./apollo')
const { getBirds } = require('./apollo/service')

/**
 * @param {api.Tracer} tracer
 */
function createHttpServer(tracer) {
  const app = express()

  app.use(express.json())

  app.get('/healthcheck', (_req, res) => {
    return res.status(HttpStatus.OK).json({
      message: 'OK',
    })
  })

  app.get('/birds', (_req, res) => {
    const span = tracer.startSpan(`${getBirds.name}`)

    api.context.with(api.setSpan(api.ROOT_CONTEXT, span), async () => {
      try {
        const birds = await getBirds()
        span.setStatus({ code: api.SpanStatusCode.OK })

        res.status(HttpStatus.OK).json({ birds })
      } catch (e) {
        console.log('failed:', e.message)
        span.setStatus({ code: api.SpanStatusCode.ERROR, message: e.message })
      }
      span.end()
    })
  })

  apolloServer.applyMiddleware({ app })

  return http.createServer(app)
}

module.exports = createHttpServer
