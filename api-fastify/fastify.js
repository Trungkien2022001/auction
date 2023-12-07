// Require the framework and instantiate it
const fastify = require('fastify')({ logger: false })

// Declare a route
fastify.get('/', function handler (request, reply) {
  reply.send({ hello: 'world' })
})

// Run the server!
fastify.listen({ port: 5050 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})