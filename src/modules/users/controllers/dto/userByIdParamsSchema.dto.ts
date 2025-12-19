export const userByIdParamsSchema = {
  type: 'object',
  required: ['userId'],
  properties: {
    userId: { type: 'string' },
  },
} as const;

