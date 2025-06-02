# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SvelteKit static site that displays a user's GitHub pull requests. It's deployed to Cloudflare Pages and automatically updates every 5 minutes via GitHub Actions.

## Common Commands

```bash
# Install dependencies (requires pnpm)
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type checking
pnpm check

# Lint code
pnpm lint

# Fix linting issues
pnpm format

# Deploy to Cloudflare Pages
pnpm deploy
```

## Architecture

### Data Flow

1. **Build-time data fetching**: All GitHub data is fetched at build time in `src/routes/+page.server.ts`
2. **Static generation**: Site is pre-rendered as static HTML via `@sveltejs/adapter-static`
3. **Automatic updates**: GitHub Actions rebuilds and deploys every 5 minutes

### Key Components

- **Server-side logic**: `src/routes/+page.server.ts` fetches user info and PRs from GitHub API
- **GitHub API client**: `src/lib/octokit.server.ts` manages Octokit instance (optional auth token)
- **Type-safe routes**: Generated in `src/lib/ROUTES.ts` via vite-plugin-kit-routes
- **Configuration**: Site settings in `vite.config.ts` under `kitRoutes` plugin

### Styling

- Uses UnoCSS (atomic CSS) with Svelte extractor
- Dark mode support via svelte-fancy-darkmode
- Custom animations defined in `uno.config.ts`

### Important Configuration

The main configuration is in `vite.config.ts`:

```javascript
kitRoutes({
	domain: 'https://pr.ryoppippi.com',
	repo: 'https://github.com/ryoppippi/pr.ryoppippi.com',
	username: 'ryoppippi',
	includeYourOwnPRs: false,
	hideList: 'owner/repo1,owner/repo2' // Supports glob patterns
});
```

### Environment Variables

- `GITHUB_TOKEN` (optional): Increases GitHub API rate limit from 60 to 5000 requests/hour
