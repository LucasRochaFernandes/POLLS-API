import fastify from 'fastify'
import { pollsRoutes } from './http/controllers/polls/routes'
export const app = fastify()

app.register(pollsRoutes)
