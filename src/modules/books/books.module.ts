import type { FastifyInstance } from 'fastify';
import { IS_STANDALONE_MICRO_SERVICES } from '../../common/constants';
import { BooksController } from './controllers/books.controller';
import { BooksService } from './services/books.service';

export class BooksModule {
  private booksService!: BooksService;

  constructor(private readonly app: FastifyInstance) {
    this.initializeModule();
  }

  private initializeModule(): void {
    this.booksService = new BooksService();

    // Only attach routes if running as a standalone micro-service
    if (IS_STANDALONE_MICRO_SERVICES) {
      this.attachControllers(this.app);
    }
  }

  private attachControllers(app: FastifyInstance): void {
    const booksController = new BooksController(app, this.booksService);

    booksController.registerRoutes();
  }

  get services() {
    return {
      booksService: this.booksService,
    };
  }
}
