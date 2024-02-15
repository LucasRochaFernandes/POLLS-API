import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { pollsRoutes } from './http/controllers/polls/routes'
import fastifyWebsocket from '@fastify/websocket'
import { pollResults } from './http/ws/poll-results'
export const app = fastify()

app.register(cookie, {
  secret: 'c2c6d8be-9d86-4734-9fa8-7b178cc18b02',
  hook: 'onRequest',
})

app.register(fastifyWebsocket)
app.register(pollResults)

app.register(pollsRoutes)
