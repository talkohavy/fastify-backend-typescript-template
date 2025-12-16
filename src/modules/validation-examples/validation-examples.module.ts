import type { FastifyInstance } from 'fastify';
import { ValidationExamplesController } from './controllers/validation-examples.controller';

export class ValidationExamplesModule {
  constructor(private readonly app: FastifyInstance) {
    this.initializeModule();
  }

  private initializeModule(): void {
    this.registerController(this.app);
  }

  registerController(app: FastifyInstance): void {
    const validationExamplesController = new ValidationExamplesController(app);

    validationExamplesController.registerRoutes();
  }
}
