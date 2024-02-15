import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { prisma } from '../../../lib/prisma'

export async function getPoll(request: FastifyRequest, reply: FastifyReply) {
  const getPollParams = z.object({
    pollId: z.string(),
  })
  console.log(request.params)
  const { pollId } = getPollParams.parse(request.params)
  const poll = await prisma.poll.findUnique({
    where: {
      id: pollId,
    },
    include: {
      options: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  })
  return reply.status(200).send(poll)
}
