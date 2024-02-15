import { FastifyInstance } from 'fastify'
import { create } from './create'
import { getPoll } from './get'
export async function pollsRoutes(app: FastifyInstance) {
  app.post('/polls', create)
  app.get('/polls/:pollId', getPoll)
}
