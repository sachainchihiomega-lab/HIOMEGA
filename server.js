import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

// Enable gzip/deflate compression
app.use(compression());

// Health check endpoints for Cloud Run / Nginx / Kubernetes probes
const healthRoutes = ['/healthz', '/health', '/livez', '/readyz', '/_health'];
app.all(healthRoutes, (req, res) => {
  res.status(200).send('OK');
});

// Ensure dist is built if missing
if (!fs.existsSync(indexPath)) {
  console.log('dist/index.html missing. Running production build on startup...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('Build completed successfully.');
  } catch (err) {
    console.error('Build execution failed:', err);
  }
}

// Serve static assets from dist
app.use(express.static(distPath, {
  maxAge: '1y',
  etag: true,
  immutable: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// SPA fallback for all GET routes
app.get('*', (req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath, (err) => {
      if (err && !res.headersSent) {
        res.status(500).send('Error loading page');
      }
    });
  } else {
    res.status(200).send('<!doctype html><html><head><meta http-equiv="refresh" content="2"></head><body>HI-OMEGA Application is initializing...</body></html>');
  }
});

// Graceful process management
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`HI-OMEGA production server running on http://0.0.0.0:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed cleanly');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    process.exit(0);
  });
});
