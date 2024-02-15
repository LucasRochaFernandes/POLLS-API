import { FastifyInstance } from 'fastify'

export async function pollResults(app: FastifyInstance) {
  // É usado para responder a alguma ação
  app.get('/polls/:pollId/results', { websocket: true }, (connection) => {
    connection.socket.on('message', (message: string) => {
      connection.socket.send(`you send: ${message}`)
    })
  })
}
