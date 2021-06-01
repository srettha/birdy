// eslint-disable-next-line import/order

const api = require('@opentelemetry/api')
const axios = require('axios').default
const express = require('express')
const http = require('http')
const HttpStatus = require('http-status')

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
    const span = tracer.startSpan('makeRequest')

    api.context.with(api.setSpan(api.ROOT_CONTEXT, span), async () => {
      try {
        const result = await axios.get('http://localhost:5001/birds')
        console.log('status:', result.statusText)
        span.setStatus({ code: api.SpanStatusCode.OK })

        res.status(HttpStatus.OK).json({ birds: result.data.birds })
      } catch (e) {
        console.log('failed:', e.message)
        span.setStatus({ code: api.SpanStatusCode.ERROR, message: e.message })
      }
      span.end()
    })
  })

  return http.createServer(app)
}

module.exports = createHttpServer
