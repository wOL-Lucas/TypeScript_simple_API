import { FastifyInstance } from 'fastify';
import { sql } from '../lib/postgres';
import  User  from '../entities/user';

export default function routes(fastify: FastifyInstance, options: any, done: Function){
  fastify.post('/register', async (request, reply) => {
    try {
      const { email, password } = User.parse(request.body);
      
      await sql`INSERT INTO users (email, password) VALUES (${email}, ${password})`
      .then(() => {
        return reply.status(201).send({message: "User created successfully"})
      })
      .catch((error) => {
        if (error.code === '23505') {
          return reply.status(400).send({message: "Email already registered"})
        }
        return reply.status(400).send({message: "User creation failed"})
      })
    
    }
    catch (error) {
      console.log(error)
      return reply.status(400).send({message: "Invalid payload"})
    }
  })

  done();
}

