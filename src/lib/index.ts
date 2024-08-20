export type PR = {
	repo: string;
	title: string;
	url: string;
	created_at: string;
	state: 'merged' | 'open' | 'closed';
	number: number;
};

export type User = {
	username: string;
	name: string;
	avatar: string;
};

export type Contributions = {
	user: User;
	prs: PR[];
};
