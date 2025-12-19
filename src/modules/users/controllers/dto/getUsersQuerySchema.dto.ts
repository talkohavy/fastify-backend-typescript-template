/**
 * JSON Schema for GET /users query parameters validation.
 * Fastify will validate and coerce types automatically.
 */
export const getUsersQuerySchema = {
  type: 'object',
  properties: {
    // Pagination
    page: { type: 'integer', minimum: 1, default: 1 },
    limit: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
    sortBy: { type: 'string', enum: ['id', 'email', 'nickname', 'created_at', 'updated_at'] },
    sortOrder: { type: 'string', enum: ['asc', 'desc'], default: 'desc' },
    // Filters
    email: { type: 'string' },
    nickname: { type: 'string' },
    is_active: { type: 'boolean' },
  },
  additionalProperties: false,
} as const;
