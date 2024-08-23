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

## Setup

```bash
# install dependencies
pnpm install

# serve in dev mode, with hot reload at localhost:3000
GH_TOKEN=(gh auth token) pnpm dev

# build for production
GH_TOKEN=(gh auth token) pnpm build
```

## Deploy

```bash
pnpm run deploy
```

If you want to deploy from GitHub Actions, you need to set the following secrets:

- `GH_TOKEN`: GitHub token
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account ID
- `CLOUDFLARE_API_TOKEN`: Cloudflare API token

## Inspired by

- [Anthony Fu](https://github.com/antfu)'s [releases.antfu.me](https://github.com/antfu/releases.antfu.me)
- [leonf-fong](https://github.com/leon-fong)'s [pr.leofong.me](https://github.com/leon-fong/prs)
- [atinux](https://github.com/atinux)'s [my-pull-requests](https://github.com/atinux/my-pull-requests)

## License

[MIT License](./LICENSE)
