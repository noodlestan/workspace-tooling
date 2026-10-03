# Example

> A fixture for the canonical base rules.

Prettier's `printWidth` is `100`, `proseWrap` is left at its default (`preserve`), and `tabWidth` is `2`.
In a Markdown file, `useTabs` stays `false`, so blocks are indented with spaces rather than tabs.

Markdown code fences are formatted with the rules of the language they declare; the snippet below is
JavaScript, so it picks up the `singleQuote`, `semi` and `arrowParens` rules.

```js
export const slugify = value => value.toLowerCase().replace(/\s+/g, '-');
```

Quoted text keeps single quotes ('single quotes win'); apostrophes in prose (like Noodlestan's) are left alone;
sentences end with semicolons where a semicolon is the correct mark.
