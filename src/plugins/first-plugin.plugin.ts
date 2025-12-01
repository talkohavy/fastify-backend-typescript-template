import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import createPlugin from 'fastify-plugin';

async function sayHelloToPlugin(fastify: FastifyInstance, _options: FastifyPluginOptions) {
  fastify.decorateRequest('helloRequest', 'Hello World');
  fastify.decorate('helloInstance', 'Hello Fastify Instance');
}

const sayHelloPlugin = createPlugin(sayHelloToPlugin);

export default sayHelloPlugin;
