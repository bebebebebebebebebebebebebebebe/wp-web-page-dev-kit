import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => ({
  root: './src',
  publicDir: '../public',
  plugins: [
    {
      name: 'serve-build-files',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/main.js' || req.url === '/style.css') {
            const filePath = resolve(__dirname, `.build${req.url}`);
            if (fs.existsSync(filePath)) {
              const content = fs.readFileSync(filePath, 'utf-8');
              const contentType = req.url.endsWith('.css') ? 'text/css' : 'application/javascript';
              res.setHeader('Content-Type', contentType);
              res.end(content);
              return;
            }
          }
          next();
        });
      }
    }
  ],
  optimizeDeps: {
    entries: ['src/js/index.js']
  },
  build: {
    outDir: mode === 'development' ? '../.build' : '../dist',
    emptyOutDir: false,
    sourcemap: false,
    minify: mode !== 'development',
    rollupOptions: {
      input: resolve(__dirname, 'src/js/index.js'),
      output: {
        entryFileNames: 'main.js',
        format: 'iife',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'style.css';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    cssCodeSplit: false,
  }
}));
