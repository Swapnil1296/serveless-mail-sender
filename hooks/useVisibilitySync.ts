'use client';

import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_PATH = '/_next/socket.io';

/**
 * Connects to Socket.io when user is authenticated and calls onVisibilityUpdated
 * when server emits visibility-updated (e.g. admin changed this user's projects).
 * No-op if no token or socket server not running (e.g. next dev).
 */
export function useVisibilitySync(onVisibilityUpdated: () => void, token: string | null): void {
  const socketRef = useRef<Socket | null>(null);
  const callbackRef = useRef(onVisibilityUpdated);
  callbackRef.current = onVisibilityUpdated;

  useEffect(() => {
    if (!token || typeof window === 'undefined') return;

    let mounted = true;
    const socket = io({
      path: SOCKET_PATH,
      auth: { token },
      transports: ['websocket', 'polling'],
    });

    socketRef.current = socket;

    socket.on('visibility-updated', () => {
      if (mounted) callbackRef.current();
    });

    socket.on('connect_error', () => {
      // Expected when running next dev (no custom server); ignore
    });

    return () => {
      mounted = false;
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token]);
}
