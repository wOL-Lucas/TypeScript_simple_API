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
  });

  fastify.put('/register', async (request, reply) =>{
    
    try{
      const { email, password } = User.parse(request.body);
      await sql`SELECT * FROM users WHERE email = ${email}`
      .then(async (result) => {
        if (result.length === 0) {
          return reply.status(404).send({message: "User not found"})
        }
        await sql`UPDATE users SET password = ${password} WHERE email = ${email}`
        return reply.status(200).send({message: "Password updated successfully"})
      })
    }
    catch(error){
      return reply.status(400).send({message: "Invalid payload"})
    } 
  });

  fastify.delete('/register', async (request, reply) => {
    try{
      const { email }: { email: string } = request.body as any;  
      
      await sql`SELECT * FROM users WHERE email = ${email}`
      .then(async (result) => {
        if (result.length === 0) {
          return reply.status(404).send({message: "User not found"})
        }
        await sql`DELETE FROM users WHERE email = ${email}`
        return reply.status(200).send({message: "User deleted successfully"})
      })
    }
    catch(error){
      return reply.status(400).send({message: "Invalid payload"})
    }
  });  

  done();
}

