import type { FastifyInstance, RouteShorthandOptions } from 'fastify';

export class SerializationExamplesController {
  constructor(private readonly app: FastifyInstance) {}

  private serializeResponse(app: FastifyInstance) {
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

    app.get('/api/response-serialization', opts, async (_request, _reply) => {
      return { message: 'my serialized response', thisKeyWillNotBeSent: 'this key will not be sent' };
    });
  }

  private serializeBody(app: FastifyInstance) {
    const opts: RouteShorthandOptions = {
      schema: {
        body: {
          type: 'object',
          properties: {
            someNumber: { type: 'string' }, // <--- try changing this from 'string' to 'number'
            someKey: { type: 'string' },
            someOtherKey: { type: 'number' },
          },
        },
      },
    };

    app.post('/api/body-serialization', opts, async (request, _reply) => {
      console.log('request.body is:', request.body);
      return { valid: true, serializedBody: request.body };
    });
  }

  registerRoutes() {
    this.app.register(this.serializeResponse);
    this.app.register(this.serializeBody);
  }
}
