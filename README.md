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
- [Cloudflare Pages](https://pages.cloudflare.com/)

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
		repo: 'https://github.com/ryoppippi/pr.ryoppippi.com', // GitHub repository name
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

```bash
pnpm run deploy
```

If you want to deploy from GitHub Actions, you need to set the following secrets:

- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account ID
- `CLOUDFLARE_API_TOKEN`: Cloudflare API token

## Inspired by

- [Anthony Fu](https://github.com/antfu)'s [releases.antfu.me](https://github.com/antfu/releases.antfu.me)
- [leonf-fong](https://github.com/leon-fong)'s [pr.leofong.me](https://github.com/leon-fong/prs)
- [atinux](https://github.com/atinux)'s [my-pull-requests](https://github.com/atinux/my-pull-requests)

## License

[MIT License](./LICENSE)
