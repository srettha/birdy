const api = require('@opentelemetry/api')

const { birdService, songService } = require('../services')

async function sing(job) {
  const { tracer } = job
  const currentSpan = api.getSpan(api.context.active())
  console.log(`traceid: ${currentSpan.context().traceId}`)
  const span = tracer.startSpan(`singASong`, {
    kind: api.SpanKind.CONSUMER,
  })

  const { birdId } = job

  api.context.with(api.setSpan(api.ROOT_CONTEXT, span), async () => {
    if (!birdId) {
      console.log('do nothing if bird id is not given')

      return
    }

    let bird

    try {
      bird = await birdService.getBirdByBirdId(birdId)
      if (!bird) {
        console.log('do nothing if bird does not exist')

        return
      }
    } catch (err) {
      span.setStatus({ code: api.SpanStatusCode.ERROR, message: err.message })

      return
    }

    try {
      await songService.singASongByBird(bird)
    } catch (err) {
      span.setStatus({ code: api.SpanStatusCode.ERROR, message: err.message })

      return
    }
    span.end()
  })
}

module.exports = {
  sing,
}
