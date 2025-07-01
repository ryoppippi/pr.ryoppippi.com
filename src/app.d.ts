/* eslint-disable ts/consistent-type-definitions */
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import 'unplugin-icons/types/svelte';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env?: {
				GITHUB_TOKEN?: string;
				[key: string]: unknown;
			};
			context?: ExecutionContext;
			caches?: CacheStorage;
			cf?: IncomingRequestCfProperties;
		}
	}
}

export {};
