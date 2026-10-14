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
- `knowledge/index.md` — knowledge, architecture, and decision records.options.

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

- `./node_modules/@noodlestan/conventions-typescript/art/index.md` — TypeScript conventions.
- `./node_modules/@noodlestan/conventions-unit-tests/art/index.md` — Unit Test conventions.

In case of ambiguity or conflict applying conventions, follow links from the convention indexes to extended convention files and read the examples there for what to follow and what to avoid.

## Workflows

Projects in this repository use the following workflows:

| Workflow / Path                                                            | Purpose                                                                                           |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Planning Work** `$DOMAINS/work/workflows/planning-work/workflow.art`     | Create and manage work item lifecycles, collecting operational instructions according to context. |
| **Delegating Work** `$DOMAINS/work/workflows/delegating-work/workflow.art` | Organize work delegation to sub-agents with validation, execution, and verification.              |
| **Executing Work** `$DOMAINS/work/workflows/executing-work/workflow.art`   | Organize work execution by sub-agents to produce completed, verified outcomes and feedback.       |
| **Deploying** `$DOMAINS/deployments/workflows/deploying/workflow.art`      | Organizes deployment of artefacts in operations.                                                  |

### Roadmapping

This repository maintains one repository level roadmap:

- The roadmap lives at `_roadmap/` with subdirectories such as `/3-now` and `/4-next/`.
- The short-term roadmapping focus is captured in `_roadmap/_parking-lot.md`.

### Planning Work

This repository maintains one repository level backlog:

- The backlog lives at `_backlog/` with subdirectories such as `/3-now` and `/4-next/`.
- The short-term focus is captured in `_backlog/_parking-lot.md`.

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
