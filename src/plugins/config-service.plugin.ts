import type { FastifyInstance } from 'fastify';
import { type Config, configuration } from '../configurations';
import { ConfigService } from '../lib/config-service';

export function configServicePlugin(app: FastifyInstance) {
  const configSettings: Config = configuration();
  const configService = new ConfigService(configSettings);

  app.decorate('configService', configService);

  return configService;
}
