# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SvelteKit application that displays a user's GitHub pull requests. It's deployed to Cloudflare Workers using server-side rendering with HTTP caching.

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

# Deploy to Cloudflare Workers
pnpm deploy
```

## Important: Always run before committing

**ALWAYS** run these commands before creating a pull request:

```bash
pnpm lint
pnpm check
```

These ensure code quality and type safety. If any errors occur, fix them before committing.

**ALSO** run these commands **after making any changes** to ensure everything still works:

```bash
pnpm format  # Auto-fixes formatting issues (includes lint --fix)
pnpm check   # Validates TypeScript types
```

**Note**: `pnpm format` internally calls `pnpm lint --fix`, so you don't need to run both. Always run `pnpm format` first, then `pnpm check`.

## Architecture

### Data Flow

1. **Server-side rendering**: GitHub data is fetched on each request in `src/routes/+page.server.ts`
2. **Cloudflare Workers deployment**: Site is deployed via `@sveltejs/adapter-cloudflare` with wrangler.jsonc config
3. **HTTP caching**: Responses are cached for 5 minutes using `cache-control` headers

### Key Components

- **Server-side logic**: `src/routes/+page.server.ts` fetches user info and PRs from GitHub API with caching
- **GitHub API client**: `src/lib/octokit.server.ts` manages Octokit instance (optional auth token)
- **Data layer**: `src/lib/index.ts` contains GitHub API logic (getUser, getPRs functions)
- **Type-safe routes**: Generated in `src/lib/ROUTES.ts` via vite-plugin-kit-routes
- **Configuration**: Site settings in `vite.config.ts` under `kitRoutes.LINKS`

### Styling

- Uses UnoCSS (atomic CSS) with Svelte extractor
- Dark mode support via svelte-fancy-darkmode
- Custom animations defined in `uno.config.ts`

### Deployment Platform

**IMPORTANT**: This application runs on Cloudflare Workers, not a traditional Node.js server. This affects:

- Available APIs (use Cloudflare Workers APIs, not Node.js APIs)
- Caching strategy (use Cloudflare Cache API with waitUntil)
- Runtime environment (edge computing, not server)

### Important Configuration

The main configuration is in `vite.config.ts`:

```javascript
kitRoutes({
	LINKS: {
		domain: 'https://pr.ryoppippi.com',
		repo: 'https://github.com/ryoppippi/pr.ryoppippi.com',
		username: 'ryoppippi',
		includeYourOwnPRs: 'true', // 'true' or 'false'
		hideList: ([
			'ryoppippi/ryoppippi.com',
			'ryoppippi/talks',
			'ryoppippi/cv',
			'samchon/*',
			'wrtnlabs/*',
			'StackOneHQ/*',
		]).join(','), // Supports glob patterns
	},
});
```

### Environment Variables

- `GITHUB_TOKEN` (optional): Increases GitHub API rate limit from 60 to 5000 requests/hour

## Development Guidelines

- Use fish shell instead of bash for all commands
- Keep commits small and meaningful with detailed messages
- Use English for all commit messages, code comments, and documentation
- Avoid pushing directly to main branch - create feature branches and PRs instead
- When creating PRs with fish shell, avoid HEREDOC syntax and use direct string passing
- For multiline git commits, use multiple `-m` flags instead of embedded newlines

## Tools Available

- `rg` - fast grep replacement for searching code
- `fd` - fast find replacement for file discovery
- `bat` - cat replacement with syntax highlighting
- `eza` - ls replacement with git integration
- `bunx` - npx replacement for running packages
- `jq` - JSON processor for API responses
- `typos` - spell checker for documentation
