import { FastifyInstance } from 'fastify'
import { create } from './create'
export async function pollsRoutes(app: FastifyInstance) {
  app.post('/polls', create)
}
