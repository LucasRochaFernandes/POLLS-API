import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { pollsRoutes } from './http/controllers/polls/routes'
export const app = fastify()

app.register(cookie, {
  secret: 'c2c6d8be-9d86-4734-9fa8-7b178cc18b02',
  hook: 'onRequest',
})
app.register(pollsRoutes)
