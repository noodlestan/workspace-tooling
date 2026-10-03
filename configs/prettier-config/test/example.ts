export const formatName = (first: string, last: string): string => {
	return `${first} ${last}`;
};

export const greet = name => `Hello, ${name}!`;

export const extensionOf = (path: string) => {
	const segments = path.split('/');

	return segments[segments.length - 1].split('.')[1];
};

export type FormatterOptions = {
	extensions: string[];
	tabWidth: number;
};
