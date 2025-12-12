import { SerializationExamplesController } from './controller/serialization-examples.controller';

export class SerializationExamplesModule {
  constructor(private readonly app: any) {
    this.initializeModule();
  }

  private async initializeModule(): Promise<void> {
    this.registerController(this.app);
  }

  private registerController(app: any): void {
    const controller = new SerializationExamplesController(app);

    controller.registerRoutes();
  }
}
