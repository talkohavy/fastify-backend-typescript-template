import assert from 'node:assert';
import { describe, it } from 'node:test';
import { buildApp } from '../../app';

describe('HealthCheckController', () => {
  it('should return 200', async (testContext) => {
    const app = await buildApp();

    // At the end of your tests it is highly recommended to call `.close()`
    // to ensure that all connections to external services get closed.
    testContext.after(() => app.close());

    const response = await app.inject({
      method: 'GET',
      url: '/api/health-check',
    });

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body, JSON.stringify({ status: 'OK' }));
  });
});
