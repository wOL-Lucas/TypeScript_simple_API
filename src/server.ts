import fastify from 'fastify';
import { z } from 'zod';
import { sql } from './lib/postgres';
import home from './routes/home';
import register from './routes/register';
import login from './routes/login';
import auth from './middlewares/auth';
import dotenv from 'dotenv';

class App {
  private server = fastify({ logger: true });
  private port:number = Number(process.env.PORT) || 3000;
  constructor() {
    dotenv.config();
    this.server.addHook('preHandler', auth);
    this.server.register(home);
    this.server.register(register);
    this.server.register(login);
  }

  async start() {
    this.server.listen({
      port: this.port,
    }).then(()=>{
      console.log("Server started on port 3000")
    })
  }
}


let app = new App();
app.start();
