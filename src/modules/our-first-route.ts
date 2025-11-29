import type { FastifyInstance } from 'fastify';

export default async function ourFirstRoute(fastify: FastifyInstance, _options: object) {
  fastify.get('/api/my-first-route', async (_request, _reply) => {
    return { message: 'my-first-route' };
  });
}
