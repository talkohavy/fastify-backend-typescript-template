import type { FastifyInstance } from 'fastify';
import type { RedisClientType } from 'redis';
import fp from 'fastify-plugin';
import { RedisConnection, type RedisConfig } from '../../lib/database/redis';

export const redisPlugin = fp(redisPluggable, {
  name: 'fastify-redis',
  fastify: '5.x',
});

export type RedisClients = {
  pub: RedisClientType;
  sub: RedisClientType;
};

export type RedisPluginOptions = RedisConfig;

async function redisPluggable(app: FastifyInstance, options: RedisPluginOptions): Promise<void> {
  const { connectionString } = options;

  if (!connectionString) {
    throw new Error('Redis connection string is required');
  }

  const pubConnection = new RedisConnection({ ...options, connectionName: 'pub' });
  const subConnection = new RedisConnection({ ...options, connectionName: 'sub' });

  try {
    const [pubClient, subClient] = await Promise.all([pubConnection.connect(), subConnection.connect()]);

    app.log.info('✅ Redis pub client connected');
    app.log.info('✅ Redis sub client connected');

    const redisClients: RedisClients = {
      pub: pubClient,
      sub: subClient,
    };

    // Decorate fastify instance - accessible as fastify.redis.pub / fastify.redis.sub
    app.decorate('redis', redisClients);

    // Graceful shutdown - Fastify calls this automatically on close
    app.addHook('onClose', async (instance) => {
      try {
        await Promise.all([pubConnection.disconnect(), subConnection.disconnect()]);
        instance.log.info('📴 Redis connections closed');
      } catch (error: any) {
        instance.log.error('❌ Error closing Redis connections:', error);
      }
    });
  } catch (error: any) {
    app.log.error('❌ Failed to connect to Redis:', error);
    throw error;
  }
}
