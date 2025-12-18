import { HealthCheckController } from './health-check.controller';

export class HealthCheckModule {
  constructor(private readonly app: any) {
    this.initializeModule();
  }

  private initializeModule(): void {
    this.attachControllers(this.app);
  }

  private attachControllers(app: any): void {
    const controller = new HealthCheckController(app);

    controller.registerRoutes();
  }
}
