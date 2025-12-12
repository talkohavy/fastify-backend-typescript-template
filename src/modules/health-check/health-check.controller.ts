import type { FastifyInstance, RouteShorthandOptions } from 'fastify';
import type { ControllerFactory } from '../../lib/lucky-server';
import { API_URLS } from '../../common/constants';

export class HealthCheckController implements ControllerFactory {
  constructor(private readonly server: FastifyInstance) {}

  private healthCheck() {
    const options: RouteShorthandOptions = {
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
              },
            },
          },
        },
      },
    };

    this.server.get(API_URLS.healthCheck, options, async (_req, _reply) => {
      return { status: 'OK' };
    });
  }

  registerRoutes() {
    this.healthCheck();
  }
}
