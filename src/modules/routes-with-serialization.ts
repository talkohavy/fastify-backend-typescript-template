import type { FastifyInstance, RouteShorthandOptions } from 'fastify';

export default async function routesWithSerialization(fastify: FastifyInstance, _options: object) {
  const opts: RouteShorthandOptions = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
  };

  fastify.get('/api/serialized-response', opts, async (_request, _reply) => {
    return { message: 'my serialized response' };
  });
}
