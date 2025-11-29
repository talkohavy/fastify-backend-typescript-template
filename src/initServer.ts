import Fastify, { type FastifyInstance } from 'fastify';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import ourFirstRoute from './modules/our-first-route';
import routesWithValidation from './modules/routes-with-validation';

async function start() {
  const server: FastifyInstance = Fastify({});

  try {
    HealthCheckModule.getInstance().attachController(server);

    server.register(ourFirstRoute);
    server.register(routesWithValidation);

    await server.listen({ port: 8000 });

    const address = server.server.address();
    const port = typeof address === 'string' ? address : address?.port;

    console.log(`Server is running on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
