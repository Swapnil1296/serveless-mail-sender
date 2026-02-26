/**
 * Custom server: runs Next.js and Socket.io for real-time visibility sync.
 * Use: npm run start (after next build)
 * For dev without socket: npm run dev
 */

const next = require('next');
const http = require('http');
const { parse } = require('url');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || '3000', 10);
const JWT_SECRET = process.env.JWT_SECRET || (dev ? 'dev-secret-not-for-production' : '');

if (!dev && (!JWT_SECRET || JWT_SECRET.length < 32)) {
  console.error('JWT_SECRET must be set and at least 32 characters in production');
  process.exit(1);
}

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    path: '/_next/socket.io',
    addTrailingSlash: false,
    cors: { origin: true },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token || socket.handshake.query?.token;
    if (!token) {
      return next(new Error('Authentication required'));
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch (err) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.userId;
    if (userId) {
      socket.join(`user:${userId}`);
    }
    socket.on('disconnect', () => {});
  });

  global.__SOCKET_IO__ = io;

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
    console.log('> Socket.io enabled for visibility sync');
  });
});
