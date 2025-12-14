import { createClient, type RedisClientType } from 'redis';
import type { RedisConfig } from './types';

export class RedisConnection {
  private redisClient: RedisClientType | null = null;
  private connectionPromise: Promise<RedisClientType> | null = null;
  private readonly connectionString: string;
  private readonly connectionName: string;
  private readonly maxRetries: number;
  private readonly retryTimeout: number;
  private readonly flushOnConnect: boolean;

  constructor(props?: RedisConfig) {
    const {
      connectionString = 'redis://localhost:6379',
      connectionName = 'default',
      maxRetries = 5,
      retryTimeout = 15000,
      flushOnConnect = false,
    } = props ?? {};

    this.connectionString = connectionString;
    this.connectionName = connectionName;
    this.maxRetries = maxRetries;
    this.retryTimeout = retryTimeout;
    this.flushOnConnect = flushOnConnect;
  }

  async connect(): Promise<RedisClientType> {
    // If already connected, return existing client
    if (this.redisClient?.isOpen) {
      return this.redisClient;
    }

    // If connection is in progress, wait for it
    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    // Start new connection
    this.connectionPromise = this.performConnection();

    try {
      const client = await this.connectionPromise;
      return client;
    } catch (error) {
      this.connectionPromise = null;
      throw error;
    }
  }

  private async performConnection(): Promise<RedisClientType> {
    try {
      // Clean up existing client if any
      if (this.redisClient) {
        await this.cleanupClient();
      }

      this.redisClient = createClient({
        url: this.connectionString,
        socket: {
          reconnectStrategy: (retriesSoFar: number) => {
            if (retriesSoFar >= this.maxRetries) {
              return new Error(
                `Max retries (${this.maxRetries}) reached. Cannot connect to Redis (${this.connectionName}).`,
              );
            }
            return this.retryTimeout;
          },
        },
      });

      this.redisClient.on('error', (_err) => {
        // Error handling is done at plugin level via fastify.log
      });

      await this.redisClient.connect();

      // Only flush in development and when explicitly requested
      if (process.env.NODE_ENV === 'development' && this.flushOnConnect) {
        await this.redisClient.flushAll();
      }

      return this.redisClient;
    } catch (error) {
      this.redisClient = null;
      throw error;
    } finally {
      this.connectionPromise = null;
    }
  }

  getClient(): RedisClientType | null {
    return this.redisClient;
  }

  isConnected(): boolean {
    return this.redisClient?.isOpen || false;
  }

  getConnectionName(): string {
    return this.connectionName;
  }

  async disconnect(): Promise<void> {
    await this.cleanupClient();
  }

  private async cleanupClient(): Promise<void> {
    if (this.redisClient) {
      try {
        if (this.redisClient.isOpen) {
          await this.redisClient.quit();
        }
        this.redisClient.removeAllListeners();
      } catch (_error) {
        // Cleanup errors are handled silently
      } finally {
        this.redisClient = null;
      }
    }
  }
}
