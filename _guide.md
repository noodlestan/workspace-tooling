# Guide: Workspace Tooling

> Host and manage the workspace tooling related packages and their planning artefacts.

Monorepo containing build tools and configs for Noodlestan workspaces and their backlogs.

Uses Workflow: Planning Work with one backlog at `_backlog/`.

## Recommended Reading

Agents SHOULD scan these files for relevant clarifications when faced with ambiguity or omissions that may result from missing definitions.

- `_guide.md` — this file: system overview, layout, setup, verification.
- `_records/project.art` — the project record.
- `_records/repository.art` — the repository record.
- `_backlog/backlog.art` — the Backlog: Workspace Tooling record.
- `knowledge/index.md` — knowledge, architecture, and decision records.
- `knowledge/overview.md` — toolchain overview, rules, constraints, and options.

## Repository Layout

```
_guide.md           — this file
_backlog/           — backlog record and planning artefacts, by state directory
_records/           — project, repository, license, dependencies, scaffolders, and scripts records
_backlog/           — Backlog: Workspace Tooling planning artefacts
cli/                — CLI packages
configs/            — shared configuration packages
```

## Projects

| Project                  | Guide                                     | Backlog     |
| ------------------------ | ----------------------------------------- | ----------- |
| Workspace Tooling (root) | `_guide.md`                               | `_backlog/` |
| Esbuild CLI              | `cli/esbuild-cli/_guide.md`               | `NONE`      |
| ESLint Config            | `configs/eslint-config/_guide.md`         | `NONE`      |
| Prettier Config          | `configs/prettier-config/_guide.md`       | `NONE`      |
| Prettier Config          | `configs/prettier-config-astro/_guide.md` | `NONE`      |
| TS Config                | `configs/tsconfig/_guide.md`              | `NONE`      |

## Records Management

Records are co-located with the resources they describe in `_records/` directories:

- **Project:** `_records/project.art`
- **Repository:** `_records/repository.art`
- **Packages:** `{package-path}/_records/package.art`
- **NPM Deployments:** `{package-path}/_records/npm-deployment.art`

## Knowledge References

This repository maintains knowledge references at:

- `knowledge/index.md` — Repository-level knowledge index.

## Conventions

This repository follows strict conventions.

Read the convention indexes listed below and follow them when planning and executing work.

The following conventions apply to all packages in this repository:

::READ `./node_modules/@noodlestan/conventions-typescript/art/index.md` — TypeScript conventions.
::READ `./node_modules/@noodlestan/conventions-unit-tests/art/index.md` — Unit Test conventions.

In case of ambiguity or conflict applying conventions, follow links from the convention indexes to extended convention files and read the examples there for what to follow and what to avoid.

## Operating Instructions

### Operating Instructions: Setting Up

**Instructions:**

Run from the repository root (monorepo):

```bash
npm ci # to install dependencies.
```

### Operating Instructions: Verifying Completion

**Instructions:**

Runs automatically on pre-commit hook (from the repository root):

```bash
npm run ci # lint, test and build
```
