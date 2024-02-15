import { FastifyInstance } from 'fastify'
import { create } from './create'
import { getPoll } from './get'
import { voteOnPoll } from './vote-on-poll'
export async function pollsRoutes(app: FastifyInstance) {
  app.post('/polls', create)
  app.post('/polls/:pollId/votes', voteOnPoll)
  app.get('/polls/:pollId', getPoll)
}
