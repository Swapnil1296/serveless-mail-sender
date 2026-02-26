/**
 * API route wrapper: decrypts request body when X-Encrypted + payload present,
 * encrypts response when request was encrypted.
 * Use: export default withEncryption(handler);
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { decrypt, encrypt, isEncryptionEnabled, getEncryptionSecret } from './encryption';

const ENCRYPTED_HEADER = 'x-encrypted';
const PAYLOAD_KEY = 'payload';

declare module 'next' {
  interface NextApiRequest {
    encrypted?: boolean;
  }
}

function parseBody(body: unknown): Record<string, unknown> | null {
  if (body === undefined || body === null) return null;
  if (typeof body === 'object' && !Array.isArray(body)) return body as Record<string, unknown>;
  return null;
}

export function withEncryption(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void
) {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const encryptedHeader = req.headers[ENCRYPTED_HEADER];
    const isEncrypted = encryptedHeader === '1' || encryptedHeader === 'true';

    if (isEncrypted && req.body) {
      if (!isEncryptionEnabled()) {
        return res.status(503).json({ error: 'Server encryption not configured' });
      }
      const parsed = parseBody(req.body);
      const payload = parsed?.[PAYLOAD_KEY];
      if (typeof payload !== 'string') {
        return res.status(400).json({ error: 'Invalid encrypted payload' });
      }
      try {
        const secret = getEncryptionSecret();
        const json = decrypt(payload, secret);
        req.body = JSON.parse(json);
        (req as NextApiRequest).encrypted = true;
      } catch (e) {
        console.error('Decrypt request error:', e);
        return res.status(400).json({
          error: 'Decryption failed. Ensure API_ENCRYPTION_SECRET and NEXT_PUBLIC_API_ENCRYPTION_SECRET are identical.',
        });
      }
    }

    if ((req as NextApiRequest).encrypted && isEncryptionEnabled()) {
      const originalJson = res.json.bind(res);
      res.json = function (body: unknown): void {
        try {
          const secret = getEncryptionSecret();
          const plain = JSON.stringify(body ?? {});
          const encrypted = encrypt(plain, secret);
          res.setHeader(ENCRYPTED_HEADER, '1');
          originalJson({ [PAYLOAD_KEY]: encrypted });
        } catch (e) {
          console.error('Encrypt response error:', e);
          originalJson({ error: 'Response encryption failed' });
        }
      };
    }

    return handler(req, res);
  };
}
