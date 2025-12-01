import Fastify, { type FastifyInstance } from 'fastify';
import type { AppOptions } from './types';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import ourFirstRoute from './modules/our-first-route';
import routesWithSerialization from './modules/routes-with-serialization';
import routesWithValidation from './modules/routes-with-validation';

export async function buildApp(options?: AppOptions) {
  const app: FastifyInstance = await Fastify(options);

  HealthCheckModule.getInstance().attachController(app);

  app.register(ourFirstRoute);
  app.register(routesWithValidation);
  app.register(routesWithSerialization);

  return app;
}
