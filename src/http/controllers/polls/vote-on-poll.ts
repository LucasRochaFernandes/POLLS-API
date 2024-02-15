import { randomUUID } from 'node:crypto'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function voteOnPoll(request: FastifyRequest, reply: FastifyReply) {
  const voteOnPollBody = z.object({
    pollOptionId: z.string().uuid(),
  })
  const voteOnPollParams = z.object({
    pollId: z.string(),
  })
  const { pollOptionId } = voteOnPollBody.parse(request.body)
  const { pollId } = voteOnPollParams.parse(request.params)

  let { sessionId } = request.cookies
  if (!sessionId) {
    sessionId = randomUUID()
    reply.setCookie('sessionId', sessionId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      signed: true,
      httpOnly: true,
    })
  }

  return reply.status(201).send({ sessionId })
}
