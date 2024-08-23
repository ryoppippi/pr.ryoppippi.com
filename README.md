# pr.ryoppippi.com

![Screenshot](https://github.com/user-attachments/assets/aeb193b5-7afe-4ef2-8078-28f54249f490)

<details>
<summary>...with nice icons!</summary>

https://github.com/user-attachments/assets/d29e0e35-05d5-4271-96dd-981fe29c1f64

</details>

## Built with

- [Svelte 5](https://svelte.dev/)
- [SvelteKit](https://kit.svelte.dev/)
- [GitHub API](https://docs.github.com/en/rest)
- [Uno CSS](https://unocss.dev/)
- [unplugin-icons](https://github.com/unplugin/unplugin-icons)

## 🚀 Setup

```bash
# corepack is recommended
corepack enable

# install dependencies
pnpm install
```

Then edit info in `vite.config.ts`.

```ts
const config = {
	// ...
	LINKS: {
		domain: `https://pr.ryoppippi.com`, // The hostname of your site
		repo: 'https://github.com/ryoppippi/pr.ryoppippi.com', // GitHub repository name ( will be the link of octocat icon 🐱 )
		username: 'ryoppippi', // GitHub username
	},
	// ...
};
export default config;
```

## 🔧 Development

```bash
pnpm dev
```

(Optional): To prevent rate limiting, you can pass your GitHub token as an environment variable:

```bash
GITHUB_TOKEN=(gh auth token) pnpm dev
```

## 📦 Build

```bash
# build for production
pnpm build
```

## ✨ Preview

```bash
pnpm preview
```

## 💻 Deploy

This repository supports two deployment destinations: [Cloudflare Pages](https://pages.cloudflare.com/) and [GitHub Pages](https://pages.github.com/).

### Cloudflare Pages

Run the following command:

```bash
pnpm run deploy
```

When deploying to Cloudflare Pages from GitHub Actions, follow the steps below:

1. set the following secrets to your repository:

   - `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account ID
   - `CLOUDFLARE_API_TOKEN`: Cloudflare API token

2. edit info in `vite.config.ts`:

   - `LINKS.domain` should be your Cloudflare Pages domain ( ex. `https://pr.ryoppippi.com` )
   - `LINKS.repo` should be your forked repository ( ex. `https://github.com/ryoppippi/pr.ryoppippi.com` )
   - `LINKS.username` should be your GitHub username ( ex. `ryoppippi` )

3. set `CF` to `env.UPLOAD_TO` in [workflows/deploy.yaml](./.github/workflows/deploy.yaml).

4. run the workflow manually or push to the repository.

5. enjoy!

### GitHub Pages

You can upload the `build` to GitHub Pages via GitHub Actions.

1. set `GH` to `env.UPLOAD_TO` in [workflows/deploy.yaml](./.github/workflows/deploy.yaml).

2. edit info in `vite.config.ts`:

   - `LINKS.domain` should be `https://<username>.github.io/<repository>`
   - `LINKS.repo` should be your forked repository ( ex. `https://github.com/ryoppippi/pr.ryoppippi.com` )
   - `LINKS.username` should be your GitHub username ( ex. `ryoppippi` )

3. run the workflow manually or push to the repository.

4. enjoy!

## Inspired by

- [Anthony Fu](https://github.com/antfu)'s [releases.antfu.me](https://github.com/antfu/releases.antfu.me)
- [leonf-fong](https://github.com/leon-fong)'s [pr.leofong.me](https://github.com/leon-fong/prs)
- [atinux](https://github.com/atinux)'s [my-pull-requests](https://github.com/atinux/my-pull-requests)

## License

[MIT License](./LICENSE)
