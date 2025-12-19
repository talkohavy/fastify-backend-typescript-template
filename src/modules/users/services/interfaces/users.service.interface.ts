import type { PaginationParams } from '../../../../common/types';

/**
 * Flat query params as received from HTTP layer.
 * The service transforms this into the repository format.
 */
export type GetUsersQueryParams = {
  // Pagination
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  // Filters
  email?: string;
  nickname?: string;
  is_active?: boolean;
};

/**
 * Internal DTO for repository layer (structured format).
 */
export type GetUsersQueryDto = {
  filter?: Record<string, unknown>;
  pagination?: PaginationParams;
};

export type CreateUserDto = {
  email: string;
  password: string;
  nickname: string;
  dateOfBirth: number | string;
};

export type UpdateUserDto = {
  email?: string;
  password?: string;
  nickname?: string;
  dateOfBirth?: number | string;
};
