export const createBookSchema = {
  type: 'object',
  required: ['name', 'author', 'publishedYear'],
  properties: {
    name: { type: 'string', minLength: 1, maxLength: 40 },
    author: { type: 'string' },
    publishedYear: { type: 'integer', minimum: 1900, maximum: 2023 },
  },
  additionalProperties: false, // <--- defaults to `true`. Prevents unexpected properties from being added to the object. Will not throw an error if the object has additional properties, it will simply remove them.
} as const;
