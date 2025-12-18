import type { FastifyInstance } from 'fastify';
import helmet from '@fastify/helmet';

export async function helmetPlugin(app: FastifyInstance) {
  await app.register(helmet, {
    contentSecurityPolicy: false,
    // global: true, // <--- defaults to true. `true` applies to all routes.
  });
}
