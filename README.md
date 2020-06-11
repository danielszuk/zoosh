This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/pages/index.tsx`. The page auto-updates as you edit the file.

## Conventional Commits
The commit messages should be structured as follows:
```
<TYPE>[optional scope]: <description>
```
**Type** must be one of the following:
- **BUILD**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **CI**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **DOCS**: Documentation only changes
- **FEAT**: A new feature
- **FIX**: A bug fix
- **PERF**: A code change that improves performance
- **REFACTOR**: A code change that neither fixes a bug nor adds a feature
- **STYLE**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **TEST**: Adding missing tests or correcting existing tests

A **scope** may provided to a commit’s type, to provide additional contextual information and is contained within parenthesis

Examples:
```
FEAT(parser): add ability to parse arrays
REFACTOR: drop support for Node 6
```

