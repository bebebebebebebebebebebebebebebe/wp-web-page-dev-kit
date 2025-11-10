# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a landing page project for DX LLP with two development environments:

1. **Static Site Development**: Built with Vite (using Rolldown) and Sass for the landing page
2. **WordPress Development**: Docker-based WordPress environment with Cocoon theme for content management

The project features a unique architecture that enables real-time development with non-module JavaScript and separate CSS compilation for the static site, alongside a containerized WordPress setup for dynamic content.

## Build System

**Package Manager**: pnpm

**Build Tool**: Vite with Rolldown (via `rolldown-vite@7.1.14`)
- Rolldown is a Rust-based bundler that replaces Vite's default bundler
- Overridden globally via pnpm overrides configuration
- Configured to output IIFE format (non-module JavaScript)

**CSS Processor**: Sass CLI (separate from Vite pipeline)
- Real-time compilation via `--watch` mode in development
- Outputs to `.build/style.css` during development
- Outputs to `dist/style.css` during production build

## Architecture

### Development Workflow

The development environment runs **three concurrent processes**:

1. **Sass Watch**: Compiles SCSS to CSS in real-time → `.build/style.css`
2. **Vite Build Watch**: Bundles JavaScript in real-time → `.build/main.js` (readable, non-minified)
3. **Vite Dev Server**: Serves files via custom middleware

Key architectural decisions:
- JavaScript source uses ES modules, but outputs to IIFE format for browser compatibility
- HTML loads JavaScript WITHOUT `type="module"` attribute (pure script tag)
- Development builds are human-readable; production builds are minified
- Custom Vite middleware intercepts requests and serves pre-built files from `.build/`

### Custom Middleware

The [vite.config.js](vite.config.js) includes a custom plugin that serves pre-built files:

```javascript
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
```

This ensures that during development:
- Requests to `/main.js` serve `.build/main.js` with correct Content-Type
- Requests to `/style.css` serve `.build/style.css` with correct Content-Type

## Common Commands

```bash
# Development server (runs 3 concurrent processes)
pnpm dev

# Production build (outputs to dist/)
pnpm build

# Preview production build
pnpm preview

# Individual watch processes (for debugging)
pnpm sass:watch    # Only Sass compilation
pnpm js:watch      # Only JavaScript bundling
```

## Project Structure

```
/
├── src/                      # Source root
│   ├── index.html           # Main HTML template (Japanese)
│   ├── js/
│   │   ├── index.js         # JavaScript entry point (ES modules)
│   │   └── user.js          # Example ES module
│   └── scss/
│       ├── style.scss       # Main stylesheet (forwards reset)
│       └── reset.scss       # CSS reset
├── .build/                  # Development build output (gitignored)
│   ├── main.js              # Bundled JavaScript (readable)
│   └── style.css            # Compiled CSS
├── dist/                    # Production build output (gitignored)
│   ├── index.html           # Copied from src/index.html
│   ├── main.js              # Bundled JavaScript (minified)
│   └── style.css            # Compiled CSS (no sourcemap)
├── public/                  # Static assets
└── vite.config.js           # Vite configuration
```

## Configuration Details

### vite.config.js Key Settings

- **root**: `'./src'` - Vite treats src/ as the root directory
- **publicDir**: `'../public'` - Static assets directory
- **Entry point**: `src/js/index.js` - JavaScript entry point
- **Output format**: `'iife'` - Immediately Invoked Function Expression (non-module)
- **Output filename**: `'main.js'` - Consistent filename without hash
- **outDir**: Conditional based on mode
  - Development: `'../.build'` - Readable, non-minified
  - Production: `'../dist'` - Minified
- **minify**: `mode !== 'development'` - Only minify in production
- **sourcemap**: `false` - No sourcemaps in any mode
- **cssCodeSplit**: `false` - Single CSS file output

### package.json Scripts

The `dev` script is complex and runs multiple processes:

```bash
sass src/scss/style.scss:.build/style.css &&
sass --watch src/scss/style.scss:.build/style.css &
vite build --watch --mode development &
vite
```

1. Initial Sass build (ensures CSS exists before server starts)
2. Sass watch mode (background process)
3. Vite build watch (background process)
4. Vite dev server

The `build` script handles production:

```bash
vite build &&
sass --no-source-map src/scss/style.scss:dist/style.css &&
cp src/index.html dist/index.html &&
rm -f dist/*.map
```

## Important Constraints

1. **HTML Structure**: [src/index.html](src/index.html) must be identical to the final [dist/index.html](dist/index.html)
   - Script tag: `<script src="main.js"></script>` (NO `type="module"`)
   - Stylesheet: `<link rel="stylesheet" href="style.css">`

2. **JavaScript Format**: Must be IIFE, not ES modules in output
   - Source files can use ES modules (`import`/`export`)
   - Vite bundles them into a single IIFE-format file

3. **CSS Pipeline**: Completely separate from Vite
   - Sass CLI handles all CSS compilation
   - Vite does NOT process any CSS files during development

4. **Build Artifacts**: Never commit `.build/` or `dist/` directories
   - Both are in .gitignore
   - `.build/` is for development only
   - `dist/` is for production deployment

## Localization

- HTML configured for Japanese language (`lang="ja"`)
- CSS includes Japanese web standards (UTF-8 charset)
- Reset stylesheet includes `-webkit-optimize-contrast` for image optimization

## Troubleshooting

### Styles not loading in browser
- Check that `.build/style.css` exists and has content
- Verify custom middleware is serving the file with `Content-Type: text/css`
- Check browser Network tab for correct response

### JavaScript errors about imports
- Ensure [vite.config.js](vite.config.js) has `format: 'iife'` in rollupOptions
- Verify HTML script tag does NOT have `type="module"`
- Check that `.build/main.js` contains wrapped IIFE code

### Build warnings about outDir
- `.build/` and `dist/` must be at project root, not inside `src/`
- Paths in vite.config.js should be relative with `../` prefix

---

## WordPress Development Environment

This project includes a fully containerized WordPress development environment using Docker Compose, configured with the Cocoon theme for Japanese websites.

### Docker Services

The WordPress environment consists of three services:

1. **MySQL 5.7** (`db`) - Database server
   - Database: `wp_local`
   - User: `wp-user`
   - Password: `wp-password`
   - Health checks enabled for proper startup sequencing

2. **WordPress** (`wordpress`) - CMS application
   - Port: `8000` (http://localhost:8000)
   - Language: Japanese (`WORDPRESS_LOCALE: ja`)
   - Custom Dockerfile with Cocoon theme auto-installation
   - Theme directory mounted from local filesystem

3. **phpMyAdmin** (`phpmyadmin`) - Database management
   - Port: `8888` (http://localhost:8888)
   - Upload limit: 1000MB

### WordPress Commands

```bash
# Start WordPress environment
bash scripts/install-cocoon.sh  # Install Cocoon themes if needed
docker-compose up -d

# Stop WordPress environment
docker-compose down

# Stop and remove all data (complete reset)
docker-compose down -v

# View logs
docker-compose logs wordpress
docker-compose logs db

# Rebuild WordPress image (after Dockerfile changes)
docker-compose build wordpress
```

### Cocoon Theme Architecture

The project uses a **hybrid approach** for Cocoon theme management:

#### Theme Structure

```
wordpress/
└── themes/
    ├── cocoon-master/         # Parent theme (auto-installed, gitignored)
    └── cocoon-child-master/   # Child theme (Git-tracked, customizable)
        ├── style.css          # Child theme styles
        ├── functions.php      # Child theme functions
        └── front-page.php     # Custom front page template (example)
```

#### Theme Management Strategy

1. **Parent Theme (cocoon-master)**
   - ✅ Auto-installed via Docker entrypoint script
   - ✅ Downloaded from GitHub on container startup
   - ✅ Excluded from Git (`.gitignore`)
   - ❌ Do NOT edit directly

2. **Child Theme (cocoon-child-master)**
   - ✅ Git-tracked for version control
   - ✅ Editable in IDE/VSCode
   - ✅ Mounted as volume for real-time development
   - ✅ Team-shareable via Git
   - ✅ Safe for customization

#### Auto-Installation Process

The custom Docker entrypoint ([scripts/docker-entrypoint-cocoon.sh](scripts/docker-entrypoint-cocoon.sh)) automatically:

1. Waits for WordPress to initialize
2. Checks if Cocoon parent theme exists
3. Downloads from GitHub if missing
4. Installs child theme if missing
5. Sets proper permissions

This ensures every team member gets the same setup without manually downloading themes.

### Theme Development Workflow

#### Initial Setup

```bash
# 1. Clone repository
git clone <repository-url>
cd dx-llp-landing-page

# 2. Install Cocoon themes and start Docker
bash scripts/install-cocoon.sh
docker-compose up -d

# 3. Access WordPress
# - WordPress: http://localhost:8000
# - Admin: http://localhost:8000/wp-admin
# - phpMyAdmin: http://localhost:8888
```

#### Editing Themes

1. **Edit child theme files** in `wordpress/themes/cocoon-child-master/`
   - Use VSCode or any IDE
   - Changes are immediately reflected (volume-mounted)
   - No container restart needed

2. **Create custom templates**
   ```php
   // Example: wordpress/themes/cocoon-child-master/front-page.php
   <?php get_header(); ?>
   <div class="custom-content">
     <!-- Your custom HTML -->
   </div>
   <?php get_footer(); ?>
   ```

3. **Commit changes to Git**
   ```bash
   git add wordpress/themes/cocoon-child-master/
   git commit -m "Add custom front page template"
   ```

### WordPress Configuration

Environment variables are set in [docker-compose.yaml](docker-compose.yaml):

```yaml
WORDPRESS_DB_HOST: db:3306
WORDPRESS_DB_USER: wp-user
WORDPRESS_DB_PASSWORD: wp-password
WORDPRESS_DB_NAME: wp_local
WORDPRESS_TABLE_PREFIX: wp_
WORDPRESS_LOCALE: ja

WORDPRESS_CONFIG_EXTRA: |
  define('WP_HOME', 'http://localhost:8000');
  define('WP_SITEURL', 'http://localhost:8000');
  define('WP_ENVIRONMENT_TYPE', 'local');
```

### Important Files

- **[docker-compose.yaml](docker-compose.yaml)** - Docker services configuration
- **[Dockerfile](Dockerfile)** - Custom WordPress image with Cocoon auto-install
- **[scripts/docker-entrypoint-cocoon.sh](scripts/docker-entrypoint-cocoon.sh)** - Theme auto-installation script
- **[scripts/install-cocoon.sh](scripts/install-cocoon.sh)** - Host-side theme installation script
- **[.env](.env)** - WordPress admin credentials (gitignored)

### Git Management

**Tracked in Git:**
- `wordpress/themes/cocoon-child-master/` - Child theme customizations
- `docker-compose.yaml` - Docker configuration
- `Dockerfile` - WordPress image definition
- `scripts/` - Installation scripts

**Excluded from Git (.gitignore):**
- `wordpress/themes/cocoon-master/` - Parent theme (auto-installed)
- `php.ini` - PHP configuration
- `.env` - Sensitive credentials
- `.playwright-mcp/` - Playwright test artifacts

### Team Collaboration

When a new team member joins:

1. They clone the repository (child theme included)
2. Run `bash scripts/install-cocoon.sh` (installs parent theme)
3. Run `docker-compose up -d`
4. Parent theme auto-installs in container
5. Child theme customizations are ready to use

No manual theme downloads needed!

### WordPress Troubleshooting

#### Container won't start
```bash
# Check service status
docker-compose ps

# View detailed logs
docker-compose logs wordpress
docker-compose logs db

# Verify health checks
docker inspect wordpress | grep -A 10 Health
```

#### Cocoon theme not appearing
```bash
# Check if themes are mounted
docker-compose exec wordpress ls -la /var/www/html/wp-content/themes/

# Re-run installation script
bash scripts/install-cocoon.sh

# Rebuild and restart
docker-compose down
docker-compose build wordpress
docker-compose up -d
```

#### Database connection errors
```bash
# Ensure MySQL is healthy before WordPress starts
docker-compose down
docker-compose up -d db
# Wait 30 seconds for MySQL to be ready
docker-compose up -d wordpress
```

#### Permission issues
The project uses standard WordPress user (`www-data`) inside containers. File permissions are managed automatically by Docker volumes.

### WordPress + Static Site Integration

While the WordPress and static site environments are separate, they can be integrated:

- **WordPress**: Content management, blog, dynamic pages (port 8000)
- **Static Site**: Landing page, marketing pages (Vite dev server)
- **Deployment**: Static site can fetch content from WordPress REST API

This dual-environment approach provides flexibility for both static and dynamic content needs.
