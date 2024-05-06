import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';


export default async function auth(request: FastifyRequest, reply: FastifyReply){
  
  const freeRoutes = ['/login'];
  console.log("REQUEST URL: ", request.url);
  if(!freeRoutes.includes(request.url)){

    const token = request.headers.authorization;
    if(!token){
      return reply.status(401).send({ message: "No token provided" })
    }

    let noBearerToken = token.split(" ")[1];
    
    if(!jwt.verify(noBearerToken, String(process.env.JWT_TOKEN))){
      return reply.status(401).send({ message: "Invalid token" })
    }

  }
}
