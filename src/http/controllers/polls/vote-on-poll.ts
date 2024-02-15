import { randomUUID } from 'node:crypto'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { redis } from '../../../lib/redis'

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
  if (sessionId) {
    const userPreviousVoteOnPoll = await prisma.vote.findUnique({
      where: {
        sessionId_pollId: {
          sessionId,
          pollId,
        },
      },
    })
    if (userPreviousVoteOnPoll) {
      if (userPreviousVoteOnPoll.pollOptionId !== pollOptionId) {
        await prisma.vote.delete({
          where: {
            id: userPreviousVoteOnPoll.id,
          },
        })
        // Função do redis que remove score(voto)
        await redis.zincrby(pollId, -1, userPreviousVoteOnPoll.pollOptionId)
      } else {
        return reply.status(400).send({
          message: 'You have already voted on this poll',
        })
      }
    }
  }
  if (!sessionId) {
    sessionId = randomUUID()
    reply.setCookie('sessionId', sessionId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      signed: true,
      httpOnly: true,
    })
  }

  await prisma.vote.create({
    data: {
      sessionId,
      pollId,
      pollOptionId,
    },
  })

  // Função que registra um score(voto) no redis, com a key 'pollId'
  await redis.zincrby(pollId, 1, pollOptionId)

  return reply.status(201).send()
}
