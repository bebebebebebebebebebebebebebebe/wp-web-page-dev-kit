import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => ({
  root: './src/layouts',
  publicDir: '../../public',
  plugins: [
    {
      name: 'serve-build-files',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // page-lp.css と page-lp.js へのリクエストを .build/ にリダイレクト
          if (req.url === '/page-lp.css' || req.url === '/page-lp.js') {
            const filePath = resolve(__dirname, `.build/page-lp${req.url}`);
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
    },
    {
      name: 'copy-html-to-build',
      closeBundle() {
        if (mode === 'development') {
          // 開発時は .build/ にコピー
          const pages = ['page-lp'];
          pages.forEach(page => {
            const srcHtml = resolve(__dirname, `src/layouts/${page}.html`);
            const destDir = resolve(__dirname, `.build/${page}`);
            const destHtml = resolve(destDir, `${page}.html`);

            if (fs.existsSync(srcHtml)) {
              if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir, { recursive: true });
              }
              fs.copyFileSync(srcHtml, destHtml);
            }
          });
        } else {
          // 本番時は dist/ にコピー
          const pages = ['page-lp'];
          pages.forEach(page => {
            const srcHtml = resolve(__dirname, `src/layouts/${page}.html`);
            const destDir = resolve(__dirname, `dist/${page}`);
            const destHtml = resolve(destDir, `${page}.html`);

            if (fs.existsSync(srcHtml)) {
              if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir, { recursive: true });
              }
              fs.copyFileSync(srcHtml, destHtml);
              console.log(`Copied ${page}.html to dist/${page}/`);
            }
          });
        }
      }
    }
  ],
  build: {
    outDir: mode === 'development' ? '../../.build' : '../../dist',
    emptyOutDir: false,
    sourcemap: false,
    minify: mode !== 'development',
    rollupOptions: {
      input: {
        'page-lp': resolve(__dirname, 'src/js/page-lp.js'),
        // 将来的にpage-frontなど他のページを追加可能
        // 'page-front': resolve(__dirname, 'src/js/page-front.js'),
      },
      output: {
        format: 'iife',
        // 各ページをディレクトリに分けて出力
        entryFileNames: (chunkInfo) => {
          const name = chunkInfo.name;
          return `${name}/${name}.js`;
        },
        assetFileNames: (assetInfo) => {
          // その他のアセット（画像など）
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
  },
  server: {
    port: 5173,
    open: '/page-lp.html', // デフォルトで開くページ
  }
}));
