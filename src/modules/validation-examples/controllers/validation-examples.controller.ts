import type { FastifyInstance, RouteShorthandOptions } from 'fastify';
import type { ControllerFactory } from '../../../lib/lucky-server';
import { API_URLS } from '../../../common/constants';

const logger = {
  info: (message: string) => {
    console.log(message);
  },
};

export class ValidationExamplesController implements ControllerFactory {
  constructor(private readonly app: FastifyInstance) {}

  private validateBodyByJson(app: FastifyInstance) {
    const bodyJsonSchema = {
      type: 'object',
      required: ['requiredKey'],
      properties: {
        someKey: { type: 'string' },
        someOtherKey: { type: 'number' },
        requiredKey: {
          type: 'array',
          maxItems: 3,
          items: { type: 'integer' },
        },
        nullableKey: { type: ['number', 'null'] }, // or { type: 'number', nullable: true }
        multipleTypesKey: { type: ['boolean', 'number'] },
        multipleRestrictedTypesKey: {
          oneOf: [
            { type: 'string', maxLength: 5 },
            { type: 'number', minimum: 10 },
          ],
        },
        enumKey: {
          type: 'string',
          enum: ['John', 'Foo'],
        },
        notTypeKey: {
          not: { type: 'array' },
        },
      },
    };

    const options: RouteShorthandOptions = {
      schema: {
        body: bodyJsonSchema,
      },
    };

    app.post(API_URLS.validateBodyByJson, options, async (req, _res) => {
      const { body } = req;

      logger.info('POST /api/validation/validate-body-by-json - validating body by json');

      return body;
    });
  }

  private validateQueryParamsByJson(app: FastifyInstance) {
    const queryStringJsonSchema = {
      type: 'object',
      properties: {
        name: { type: 'string' },
        excitement: { type: 'integer' },
      },
    };

    const options: RouteShorthandOptions = {
      schema: {
        querystring: queryStringJsonSchema,
      },
    };

    app.get(API_URLS.validateQueryParamsByJson, options, async (req, _res) => {
      const { query } = req;

      logger.info('GET /api/validation/validate-query-params-by-json - validating query params by json');

      return query;
    });
  }

  private validateParamsByJson(app: FastifyInstance) {
    const paramsJsonSchema = {
      type: 'object',
      properties: {
        part1: { type: 'string' },
        part2: { type: 'number' },
      },
    };

    const options: RouteShorthandOptions = {
      schema: {
        params: paramsJsonSchema,
      },
    };

    app.get(`${API_URLS.validateParamsByJson}/:part1/:part2`, options, async (req, _res) => {
      const { params } = req;

      logger.info('GET /api/validation/validate-params-by-json - validating params by json');

      return params;
    });
  }

  private validateHeadersByJson(app: FastifyInstance) {
    const headersJsonSchema = {
      type: 'object',
      properties: {
        'x-foo': { type: 'string' },
      },
      required: ['x-foo'],
    };

    const options: RouteShorthandOptions = {
      schema: {
        headers: headersJsonSchema,
      },
    };

    app.post(API_URLS.validateHeadersByJson, options, async (req, _res) => {
      const { headers } = req;

      logger.info('POST /api/validation/validate-headers-by-json - validating headers by json');

      return headers;
    });
  }

  private validatePreAddedSchema(app: FastifyInstance) {
    app.addSchema({
      $id: 'pre-added-schema',
      type: 'object',
      required: ['email'],
      properties: {
        email: { type: 'string' },
      },
    });

    app.post(
      API_URLS.validatePreAddedSchema,
      { schema: { body: { $ref: 'pre-added-schema#' } } },
      async (req, _res) => {
        const { body } = req;

        logger.info('POST /api/validation/validate-pre-added-schema - validating pre added schema');

        return body;
      },
    );
  }

  /**
   * NOTE! This will still be caught by the global error handler!
   *
   * It will attach req.validation to the request object, which will be handled by the global error handler.
   */
  private handleValidationErrorInsideRoute(app: FastifyInstance) {
    const opts: RouteShorthandOptions = {
      attachValidation: true, // <--- This is the important part!
      schema: {
        body: {
          type: 'object',
          properties: {
            bookId: { type: 'number' },
          },
        },
      },
    };

    app.post(API_URLS.handleValidationErrorInsideRoute, opts, async (req, res) => {
      logger.info(`POST ${API_URLS.handleValidationErrorInsideRoute} - handling validation error inside route`);

      if (req.validationError) {
        // `req.validationError.validation` contains the raw validation error
        // IMPORTANT: Return early to prevent further execution
        return res.code(407).send(req.validationError);
      }

      const { body } = req;
      return body;
    });
  }

  registerRoutes() {
    this.app.register(this.validateBodyByJson);
    this.app.register(this.validateQueryParamsByJson);
    this.app.register(this.validateParamsByJson);
    this.app.register(this.validateHeadersByJson);
    this.app.register(this.validatePreAddedSchema);
    this.app.register(this.handleValidationErrorInsideRoute);
  }
}
