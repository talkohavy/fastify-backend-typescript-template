import Fastify, { type FastifyRequest } from 'fastify';
import { test } from 'node:test';
import sayHelloPlugin from './first-plugin.plugin';

test.only('Test the Plugin Route', async (_t) => {
  // Create a mock fastify application to test the plugin
  const fastify = Fastify();

  fastify.register(sayHelloPlugin);

  // Add an endpoint of your choice
  fastify.get('/', async (request: FastifyRequest, _reply) => {
    return { message: request.helloRequest };
  });

  // Use fastify.inject to fake a HTTP Request
  const fastifyResponse = await fastify.inject({
    method: 'GET',
    url: '/',
  });

  console.log('status code: ', fastifyResponse.statusCode);
  console.log('body: ', fastifyResponse.body);
});
