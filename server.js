/* eslint-disable no-undef */
import { fileURLToPath } from 'node:url';
import Fastify from 'fastify';
import FastifyVite from '@fastify/vite';
import FastifyWebsocket from '@fastify/websocket';
import { renderToString } from 'react-dom/server';
import { processClose, processMessage, processOpen } from './server/game.js';

export async function main(dev) {
  const server = Fastify();

  await server.register(FastifyVite, {
    root: import.meta.url,
    dev: dev || process.argv.includes('--dev'),
    createRenderFunction({ createApp }) {
      return () => {
        return {
          element: renderToString(createApp()),
        };
      };
    },
  });

  await server.register(FastifyWebsocket);

  server.get('/', (req, reply) => {
    reply.html(reply.render());
  });

  server.get('/socket', { websocket: true }, (connection) => {
    connection.socket.onopen = () => {
      console.log('Socket opened');
      processOpen(connection);
    };

    connection.socket.onmessage = (message) => {
      console.log(`Received message: ${JSON.stringify(message)}`);
      processMessage(connection.socket, message);
    };

    connection.socket.onclose = () => {
      console.log('Socket closed');
      processClose(connection);
    };
  });

  await server.vite.ready();
  return server;
}

if (process.argv[1] === fileURLToPath(new URL(import.meta.url))) {
  const server = await main();
  await server.listen({ port: 3000 });
}
