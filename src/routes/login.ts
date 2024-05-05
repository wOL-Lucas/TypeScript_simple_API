import { FastifyInstance } from 'fastify';
import User from '../entities/user';
import { sql } from '../lib/postgres';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default function routes(fastify: FastifyInstance, options: any, done: Function){
  
  fastify.post('/login', async (request, reply) => {
    const { email, password } = User.parse(request.body);
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (user.length === 0) {
      return reply.status(404).send({message: "User not found"})
    }

    const isValid = await bcrypt.compare(password, user[0].password);
    if (!isValid) {
      return reply.status(401).send({message: "Invalid credentials"})
    }

    const token = jwt.sign({email: user[0].email}, process.env.JWT_SECRET as string, {expiresIn: '1h'});
    return reply.status(200).send({token: token})

  })

  done();
}
