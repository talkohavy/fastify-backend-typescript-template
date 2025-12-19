import type { GetUsersQueryDto, GetUsersQueryParams } from '../interfaces/users.service.interface';

/**
 * Transforms flat query params into the structured repository format.
 */
export function transformGetUsersQuery(queryParams: GetUsersQueryParams): GetUsersQueryDto {
  const { page, limit, sortBy, sortOrder, ...filterParams } = queryParams;

  // Build filter object from remaining params (only include defined values)
  const filter: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(filterParams)) {
    if (value !== undefined) {
      filter[key] = value;
    }
  }

  return {
    pagination: { page, limit, sortBy, sortOrder },
    filter: Object.keys(filter).length > 0 ? filter : undefined,
  };
}

