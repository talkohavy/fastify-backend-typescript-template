import type { FastifyInstance } from 'fastify';
import { IS_STANDALONE_MICRO_SERVICES } from '../../common/constants';
import { DragonsController } from './controllers/dragons.controller';
import { DragonsService } from './services/dragons.service';

export class DragonsModule {
  private dragonsService!: DragonsService;

  constructor(private readonly app: FastifyInstance) {
    this.initializeModule();
  }

  private initializeModule(): void {
    this.dragonsService = new DragonsService(this.app.redis);

    // Only attach routes if running as a standalone micro-service
    if (IS_STANDALONE_MICRO_SERVICES) {
      this.attachControllers(this.app);
    }
  }

  private attachControllers(app: FastifyInstance): void {
    const dragonsController = new DragonsController(app, this.dragonsService);

    dragonsController.registerRoutes();
  }

  get services(): { dragonsService: DragonsService } {
    return { dragonsService: this.dragonsService };
  }
}
