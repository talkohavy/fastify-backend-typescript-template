import type { FastifyInstance, RouteShorthandOptions } from 'fastify';

export default async function routesWithValidation(fastify: FastifyInstance, _options: object) {
  const opts: RouteShorthandOptions = {
    schema: {
      body: {
        type: 'object',
        properties: {
          someKey: { type: 'string' },
          someOtherKey: { type: 'number' },
        },
      },
    },
  };

  fastify.post('/api/is-valid', opts, async (request, _reply) => {
    console.log('request.body is:', request.body);
    return { valid: true };
  });
}
