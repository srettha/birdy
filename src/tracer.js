// eslint-disable-next-line import/order
const { diag, trace, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api')

// Not functionally required but gives some insight what happens behind the scenes
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO)

const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin')
const { registerInstrumentations } = require('@opentelemetry/instrumentation')
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express')
const { GraphQLInstrumentation } = require('@opentelemetry/instrumentation-graphql')
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http')
const { IORedisInstrumentation } = require('@opentelemetry/instrumentation-ioredis')
const { PgInstrumentation } = require('@opentelemetry/instrumentation-pg')
const { NodeTracerProvider } = require('@opentelemetry/node')
const { SimpleSpanProcessor } = require('@opentelemetry/tracing')

module.exports = (serviceName) => {
  const provider = new NodeTracerProvider()
  registerInstrumentations({
    tracerProvider: provider,
    instrumentations: [
      // Express instrumentation expects HTTP layer to be instrumented
      ExpressInstrumentation,
      HttpInstrumentation,
      IORedisInstrumentation,
      new GraphQLInstrumentation({ depth: 100 }),
      new PgInstrumentation({ enhancedDatabaseReporting: true }),
    ],
  })

  const exporter = new ZipkinExporter({
    serviceName,
  })

  provider.addSpanProcessor(new SimpleSpanProcessor(exporter))

  // Initialize the OpenTelemetry APIs to use the NodeTracerProvider bindings
  provider.register()

  return trace.getTracer('express')
}
