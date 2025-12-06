import type { FastifyInstance } from 'fastify';
import type { ModuleFactory } from '../../lib/lucky-server';
import { ValidationExamplesController } from './controllers/validation-examples.controller';

export class ValidationExamplesModule implements ModuleFactory {
  private static instance: ValidationExamplesModule;

  private constructor() {
    this.initializeModule();
  }

  static getInstance(): ValidationExamplesModule {
    if (!ValidationExamplesModule.instance) {
      ValidationExamplesModule.instance = new ValidationExamplesModule();
    }
    return ValidationExamplesModule.instance;
  }

  protected async initializeModule(): Promise<void> {}

  registerController(app: FastifyInstance): void {
    const validationExamplesController = new ValidationExamplesController(app);

    validationExamplesController.registerRoutes();
  }
}
