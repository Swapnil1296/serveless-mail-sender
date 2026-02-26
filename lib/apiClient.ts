/**
 * Centralized axios instance: encrypts request body and decrypts response
 * when API_ENCRYPTION_SECRET / NEXT_PUBLIC_API_ENCRYPTION_SECRET is set.
 * Production-ready: timeouts, auth, error handling, edge cases.
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { encrypt, decrypt, isEncryptionEnabled, getEncryptionSecret } from './encryption';

const ENCRYPTED_HEADER = 'X-Encrypted';
const PAYLOAD_KEY = 'payload';

const DEFAULT_TIMEOUT = 20000;
const BASE_URL = typeof window !== 'undefined' ? '' : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export class ApiClientError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public body?: unknown
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

/** Decrypt an API response payload for use in app code. */
export function decryptResponse<T = unknown>(encryptedBase64: string): T {
  const secret = getEncryptionSecret();
  const json = decrypt(encryptedBase64, secret);
  try {
    return JSON.parse(json) as T;
  } catch {
    throw new ApiClientError('Invalid response format after decryption', undefined, json);
  }
}

function createClient(): AxiosInstance {
  const client = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
    validateStatus: () => true,
  });

  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      if (typeof window === 'undefined') return config;

      if (!isEncryptionEnabled()) return config;

      const data = config.data;
      if (data !== undefined && data !== null && typeof data === 'object' && Object.keys(data).length > 0) {
        try {
          const secret = getEncryptionSecret();
          const plain = typeof data === 'string' ? data : JSON.stringify(data);
          const encrypted = encrypt(plain, secret);
          config.data = { [PAYLOAD_KEY]: encrypted };
          config.headers[ENCRYPTED_HEADER] = '1';
        } catch (e) {
          return Promise.reject(e);
        }
      }
      return config;
    },
    (err) => Promise.reject(err)
  );

  client.interceptors.response.use(
    (response: AxiosResponse) => {
      const encryptedHeader = response.headers?.[ENCRYPTED_HEADER] || response.headers?.['x-encrypted'];
      const data = response.data;

      if (response.status === 204 || data === undefined || data === null) {
        return response;
      }

      if (!encryptedHeader || data[PAYLOAD_KEY] === undefined) {
        if (response.status >= 400) {
          const msg = typeof data?.error === 'string' ? data.error : data?.message || `Request failed: ${response.status}`;
          throw new ApiClientError(msg, response.status, data);
        }
        return response;
      }

      try {
        const secret = getEncryptionSecret();
        const json = decrypt(data[PAYLOAD_KEY], secret);
        const parsed = JSON.parse(json);
        response.data = parsed;
        if (response.status >= 400) {
          const msg = parsed?.error || parsed?.message || `Request failed: ${response.status}`;
          throw new ApiClientError(typeof msg === 'string' ? msg : String(msg), response.status, parsed);
        }
        return response;
      } catch (e) {
        if (e instanceof ApiClientError) throw e;
        throw new ApiClientError(
          e instanceof Error ? e.message : 'Failed to decrypt response',
          response.status,
          undefined
        );
      }
    },
    (err) => {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const data = err.response?.data;
        const msg = err.message || (typeof data?.error === 'string' ? data.error : undefined) || 'Network error';
        return Promise.reject(new ApiClientError(msg, status, data));
      }
      return Promise.reject(err);
    }
  );

  return client;
}

const apiClient = createClient();

export interface ApiClientRequestConfig extends AxiosRequestConfig {
  skipEncryption?: boolean;
}

export async function apiRequest<T = unknown>(config: ApiClientRequestConfig): Promise<T> {
  const { skipEncryption, ...axiosConfig } = config;
  const res = await apiClient.request<T>(axiosConfig);
  return res.data as T;
}

export function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default apiClient;
