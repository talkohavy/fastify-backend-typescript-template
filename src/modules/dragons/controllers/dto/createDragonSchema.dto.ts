export const createDragonSchema = {
  type: 'object',
  required: ['name', 'author', 'publishedYear'],
  properties: {
    name: { type: 'string', minLength: 1, maxLength: 40 },
    author: { type: 'string' },
    publishedYear: { type: 'integer', minimum: 1900, maximum: 2023 },
  },
} as const;
