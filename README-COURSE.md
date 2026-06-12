# Claude Code 101 Playground

Practice codebase for the Claude Code 101 course by AI Builder Club. Parts 3 and 4 of the course run on this repo. You practice steering, hooks, subagents, architecture refactoring, and autonomous loops on real code with realistic flaws.

This is a working Next.js e-commerce app (Skateshop) with a few problems planted on purpose:

- `CLAUDE.md` at the root is a 289 line mess. Lesson 1.3 has you refactor it with progressive disclosure.
- `src/lib/services/shippingService.ts` has real logic, no tests, and breaks several codebase conventions. Lesson 4.1 has you fix it with red-green-refactor.
- `src/lib/checkout-utils/` is five shallow modules with tangled cross-imports that should be one deep module. Lesson 4.2 has you consolidate it.
- The GitHub issues on this repo are the backlog for lesson 4.4.

## How to use it

```bash
git clone https://github.com/JayZeeDesign/claude-code-101-playground.git
cd claude-code-101-playground
git checkout lesson-start
git checkout -b my-work
pnpm install
pnpm test
```

Do each exercise on your own branch off `lesson-start`. When you want a clean slate, reset:

```bash
git checkout lesson-start
git checkout -b retry-4.1
```

You do not need a database or API keys for the course exercises. `pnpm test` and `pnpm typecheck` work without any `.env` setup. If you want to run the full app, follow the upstream setup in `README.md`.

## Attribution

Based on [sadmann7/skateshop](https://github.com/sadmann7/skateshop) (MIT). See `ATTRIBUTION.md` for the upstream commit and the list of changes. The upstream `LICENSE.md` is preserved.
