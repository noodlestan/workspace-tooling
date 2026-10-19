# Operating Instructions

Published default operating instructions for workspace tooling packages.

## Operating Instructions: Setting Up

**Workflow:** Workflow: Executing Work

**Operation:** Operation: Setting Up

**Purpose:** Prepare the execution environment.

**CommandList:**

Override with project-specific setup commands.

```bash
npm ci # to install dependencies
```

**Instructions:**

Run from the repository root:

```bash
{commandList}
```

## Operating Instructions: Verifying Step

**Workflow:** Workflow: Executing Work

**Operation:** Operation: Verifying Step

**Purpose:** Confirms that an executed work step produces the expected result and satisfies its requirements.

**CommandList:**

Override with package-specific verification commands.

```bash
npm run lint:fix  # to fix all formatting and linting
npm run lint      # to verify formatting and linting
npm run test      # to verify all tests
npm run build     # to verify that package builds successfully
```

**Instructions:**

Run from the package directory:

```bash
{commandList}
npm run ci        # to execute all verifications
```

## Operating Instructions: Verifying Completion

**Workflow:** Workflow: Executing Work

**Operation:** Operation: Verifying Completion

**Purpose:** Confirms that the work item has been completed and satisfies its intended outcome.

**CommandList:**

Override with package-specific verification commands.

```bash
npm run lint      # to verify source quality
npm run test      # to verify automated tests pass
npm run build     # to verify the package builds successfully
```

**Instructions:**

Run from the package directory:

```bash
{commandList}
npm run ci       # to execute all verifications
```
