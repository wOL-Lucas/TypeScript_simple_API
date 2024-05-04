import fastify from 'fastify';
import { z } from 'zod';
import { sql } from './lib/postgres';
import home from './routes/home';


class App {
  private server = fastify({ logger: true });

  constructor() {
    this.server.register(home);
  }

  async start() {
    this.server.listen({port:3000}).then(()=>{
      console.log("Server started on port 3000")
    })
  }
}


let app = new App();
app.start();
