/**
 * Centralized API client with error handling, timeouts, and retries
 */

const DEFAULT_TIMEOUT = 15000;

export function getAuthHeaders(): HeadersInit {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public body?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface ApiFetchOptions extends RequestInit {
  timeout?: number;
}

export async function apiFetch<T = unknown>(
  url: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const { timeout = DEFAULT_TIMEOUT, ...fetchOptions } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    if (!response.ok) {
      const body = isJson ? await response.json().catch(() => null) : await response.text();
      throw new ApiError(
        (body?.error ?? body?.message ?? `Request failed: ${response.status}`) as string,
        response.status,
        body
      );
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return isJson ? await response.json() : (await response.text()) as T;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof ApiError) throw error;
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiError('Request timed out. Please try again.', 408);
      }
      throw new ApiError(error.message || 'Network error. Please check your connection.', 0);
    }
    throw new ApiError('An unexpected error occurred.', 0);
  }
}
