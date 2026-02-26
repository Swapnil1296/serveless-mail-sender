/**
 * AES-256-CBC + Base64 for request/response encryption.
 * Same implementation runs on server (API) and client.
 * Key: use API_ENCRYPTION_SECRET (server) or NEXT_PUBLIC_API_ENCRYPTION_SECRET (client).
 * Must be 32 bytes for AES-256; if shorter we pad/derive.
 */

import CryptoJS from 'crypto-js';

const AES_KEY_SIZE = 256;
const KEY_LENGTH_BYTES = 32;

function getKey(secret: string): CryptoJS.lib.WordArray {
  if (!secret || typeof secret !== 'string') {
    throw new Error('Encryption secret is required');
  }
  const trimmed = secret.trim();
  if (trimmed.length < 16) {
    throw new Error('Encryption secret must be at least 16 characters');
  }
  // Use hash to get consistent 32-byte key from any length secret
  const hash = CryptoJS.SHA256(trimmed).toString(CryptoJS.enc.Hex);
  return CryptoJS.enc.Hex.parse(hash);
}

/**
 * Encrypts a string and returns Base64(IV + ciphertext).
 * IV is 16 bytes prepended for AES-CBC.
 */
export function encrypt(plainText: string, secret: string): string {
  const key = getKey(secret);
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(plainText, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const combined = iv.concat(encrypted.ciphertext);
  return CryptoJS.enc.Base64.stringify(combined);
}

/**
 * Decrypts a Base64 string (IV + ciphertext) and returns plain text.
 * Throws on invalid payload or wrong key.
 */
export function decrypt(encryptedBase64: string, secret: string): string {
  if (!encryptedBase64 || typeof encryptedBase64 !== 'string') {
    throw new Error('Encrypted payload is required');
  }
  const key = getKey(secret);
  const combined = CryptoJS.enc.Base64.parse(encryptedBase64.trim());
  if (combined.sigBytes < 17) {
    throw new Error('Invalid encrypted payload');
  }
  const iv = CryptoJS.lib.WordArray.create(combined.words.slice(0, 4), 16);
  const ciphertext = CryptoJS.lib.WordArray.create(combined.words.slice(4), combined.sigBytes - 16);
  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext,
  });
  const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const str = decrypted.toString(CryptoJS.enc.Utf8);
  if (!str) {
    throw new Error('Decryption failed (wrong key or tampered data)');
  }
  return str;
}

/** Check if encryption is configured (client or server). */
export function isEncryptionEnabled(): boolean {
  if (typeof window !== 'undefined') {
    const key = process.env.NEXT_PUBLIC_API_ENCRYPTION_SECRET;
    return !!key && key.length >= 16;
  }
  const key = process.env.API_ENCRYPTION_SECRET;
  return !!key && key.length >= 16;
}

/** Get secret for current environment (client must use NEXT_PUBLIC_*). */
export function getEncryptionSecret(): string {
  if (typeof window !== 'undefined') {
    const key = process.env.NEXT_PUBLIC_API_ENCRYPTION_SECRET;
    if (!key || key.length < 16) throw new Error('NEXT_PUBLIC_API_ENCRYPTION_SECRET must be set (min 16 chars) for encrypted API');
    return key;
  }
  const key = process.env.API_ENCRYPTION_SECRET;
  if (!key || key.length < 16) throw new Error('API_ENCRYPTION_SECRET must be set (min 16 chars) for encrypted API');
  return key;
}
