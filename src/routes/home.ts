import { FastifyInstance } from 'fastify';

export default function routes(fastify: FastifyInstance, options: any, done: Function){
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

  done();
}
