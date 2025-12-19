export const createUserSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', pattern: '^[a-zA-Z0-9]{1,30}$' },
    nickname: { type: 'string', minLength: 3, maxLength: 30 },
    dateOfBirth: { type: 'string', format: 'date' },
  },
} as const;

