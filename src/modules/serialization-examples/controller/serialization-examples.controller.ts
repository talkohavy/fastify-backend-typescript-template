import type { FastifyInstance, RouteShorthandOptions } from 'fastify';

export class SerializationExamplesController {
  constructor(private readonly app: FastifyInstance) {}

  private serializeResponse() {
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

    this.app.get('/api/response-serialization', opts, async (_request, _reply) => {
      return { message: 'my serialized response', thisKeyWillNotBeSent: 'this key will not be sent' };
    });
  }

  private serializeBody() {
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

    this.app.post('/api/body-serialization', opts, async (request, _reply) => {
      console.log('request.body is:', request.body);
      return { valid: true, serializedBody: request.body };
    });
  }

  registerRoutes() {
    this.serializeResponse();
    this.serializeBody();
  }
}
