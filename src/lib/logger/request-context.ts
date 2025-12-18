import { AsyncLocalStorage } from 'node:async_hooks';

export type RequestContext = {
  requestId: string;
};

/**
 * AsyncLocalStorage instance for request-scoped context.
 * This allows automatic propagation of request data (like requestId)
 * throughout the entire request lifecycle without passing it explicitly.
 */
export const requestContext = new AsyncLocalStorage<RequestContext>();

/**
 * Get the current request context (if any).
 * Returns undefined if called outside of a request context.
 */
export function getRequestContext(): RequestContext | undefined {
  return requestContext.getStore();
}

/**
 * Get the current request ID from context (if any).
 * Returns undefined if called outside of a request context.
 */
export function getRequestId(): string | undefined {
  return requestContext.getStore()?.requestId;
}
