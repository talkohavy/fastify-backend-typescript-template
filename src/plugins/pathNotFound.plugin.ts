import type { FastifyInstance } from 'fastify';
import { NotFoundError } from '../lib/Errors';

export function pathNotFoundPlugin(app: FastifyInstance) {
  app.setNotFoundHandler((req, _res) => {
    console.error('req.originalUrl is:', req.originalUrl);
    console.error('req.url is:', req.url);
    console.error('req.body is:', req.body);
    console.error('req.params is:', req.params);

    throw new NotFoundError('Path not found');
  });
}
