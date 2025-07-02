# pr.ryoppippi.com

![Screenshot](https://github.com/user-attachments/assets/aeb193b5-7afe-4ef2-8078-28f54249f490)

<details>
<summary>Video</summary>

https://github.com/user-attachments/assets/cea80c3d-ba87-480a-8090-bb611dc2a2db

</details>

## Built with

- [Svelte 5](https://svelte.dev/)
- [SvelteKit](https://kit.svelte.dev/)
- [GitHub API](https://docs.github.com/en/rest)
- [Uno CSS](https://unocss.dev/)
- [unplugin-icons](https://github.com/unplugin/unplugin-icons)

## 🚀 Setup

```bash
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
		includeYourOwnPRs: 'true', // Include your own PRs 'true' or 'false'
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

This repository supports two deployment destinations: [Cloudflare Pages](https://pages.cloudflare.com/).

### Cloudflare Pages

Run the following command:

```bash
pnpm run deploy
```

## Inspired by

- [Anthony Fu](https://github.com/antfu)'s [releases.antfu.me](https://github.com/antfu/releases.antfu.me)
- [leonf-fong](https://github.com/leon-fong)'s [pr.leofong.me](https://github.com/leon-fong/prs)
- [atinux](https://github.com/atinux)'s [my-pull-requests](https://github.com/atinux/my-pull-requests)

## License

[MIT License](./LICENSE)
