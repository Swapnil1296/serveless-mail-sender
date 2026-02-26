/**
 * Socket.io server instance for real-time visibility sync.
 * Custom server (server.js) sets global.__SOCKET_IO__; API routes use getIO() to emit.
 */

import type { Server as SocketIOServer } from 'socket.io';

const GLOBAL_KEY = '__SOCKET_IO__';

declare global {
  var __SOCKET_IO__: SocketIOServer | undefined;
}

export function getIO(): SocketIOServer | null {
  if (typeof global === 'undefined') return null;
  return (global as typeof globalThis & { [GLOBAL_KEY]?: SocketIOServer })[GLOBAL_KEY] ?? null;
}

/** Emit visibility-updated to a specific user (for real-time sync). */
export function emitVisibilityUpdated(userId: string): void {
  const server = getIO();
  if (server) {
    server.to(`user:${userId}`).emit('visibility-updated');
  }
}
