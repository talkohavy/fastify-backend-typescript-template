export const updateUserSchema = {
  type: 'object',
  minProperties: 1,
  properties: {
    email: { type: 'string', format: 'email' },
    nickname: { type: 'string', minLength: 1, maxLength: 30 },
    dateOfBirth: { type: 'string', format: 'date' },
  },
} as const;

