import type { Mongoose } from 'mongoose';
import type { Client as PgClient } from 'pg';
import type { ConfigService } from './lib/config-service';
import type { RedisClients } from './plugins/database/redis.plugin';

declare module 'fastify' {
  export interface FastifyInstance {
    sayHello(): string;
    pg: PgClient;
    mongo: Mongoose;
    redis: RedisClients;
    configService: ConfigService;
  }

  export interface FastifyRequest {
    helloRequest: string;
    foo: any;
  }

  export interface FastifyReply {
    foo: any;
  }
}
