# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with TypeScript, hot-module replacement, Ant Design, Redux Toolkit, and a handful of useful utilities that mirror the JavaScript version of the template.

## Included Tooling

- [Vite](https://vite.dev/) with [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react)
- TypeScript configuration split into `tsconfig.app.json` and `tsconfig.node.json`
- ESLint (flat config) with `@typescript-eslint`, React hooks rules, and auto-import globals support
- Ant Design on-demand loading via `vite-plugin-imp`
- Redux Toolkit store scaffolding with typed hooks
- Axios request helpers and mock authentication API
- Tailwind CSS 4 + PostCSS pipeline

## Scripts

```bash
pnpm install
pnpm run dev
pnpm run build
pnpm run lint
pnpm run preview
pnpm run type-check
```

> ℹ️ Vite already bundles PostCSS. Tailwind CSS 4 only requires `tailwindcss`, `@tailwindcss/postcss`, `autoprefixer`, and the provided `postcss.config.js`.
