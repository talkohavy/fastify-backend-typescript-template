import type { FastifyInstance } from 'fastify';
import { DragonsController } from './controllers/dragons.controller';
import { DragonsService } from './services/dragons.service';

export class DragonsModule {
  private dragonsService!: DragonsService;

  constructor(private readonly app: FastifyInstance) {
    this.initializeModule();
  }

  private initializeModule(): void {
    this.dragonsService = new DragonsService(this.app.redis);

    this.attachControllers(this.app);
  }

  private attachControllers(app: FastifyInstance): void {
    const dragonsController = new DragonsController(app, this.dragonsService);

    dragonsController.registerRoutes();
  }

  getDragonsService(): DragonsService {
    return this.dragonsService;
  }
}
