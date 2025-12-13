import { initPostgresqlConnection } from './initPostgresqlConnection';
import { initRedisConnection } from './initRedisConnection';
// import { initMongodbConnection } from './initMongodbConnection';

export async function initConnections() {
  const dbConnection = process.env.DB_CONNECTION_STRING as string;
  const redisConnectionString = process.env.REDIS_CONNECTION_STRING as string;

  // await initMongodbConnection(dbConnection);
  await initPostgresqlConnection(dbConnection);
  await initRedisConnection(redisConnectionString);
}

// import type { FastifyInstance } from 'fastify';
// import { mongodbConnectorPlugin } from './initMongodbConnection';

// export async function initConnections(app: FastifyInstance) {
//   app.register(mongodbConnectorPlugin);
// }
