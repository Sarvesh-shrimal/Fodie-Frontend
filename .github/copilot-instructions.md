# Copilot Instructions for This Codebase

## Overview
- **Stack:** React + TypeScript + Vite
- **Structure:**
  - `src/components/layout/` — Page-level and layout components (e.g., `Header.tsx`, `Login_page.tsx`)
  - `src/components/ui/` — Reusable UI primitives (e.g., `button.tsx`, `input.tsx`)
  - `src/lib/` — Utility functions
  - `src/modules/` — (Pattern reserved for feature modules)
  - `src/services/auth/` — Auth logic (e.g., `Auth.ts`)
  - `src/utils/axios/` — Axios setup and interceptors

## Key Patterns & Conventions
- **Component Naming:**
  - PascalCase for React components (e.g., `Login_page.tsx`, `Header.tsx`)
  - UI primitives in `ui/` are lowercase (e.g., `button.tsx`)
- **Auth:**
  - Auth logic is in `src/services/auth/` and `src/utils/axios/`
  - Use `AuthSetter.ts` to set auth headers globally for Axios
- **Utilities:**
  - Shared utilities go in `src/lib/utils.ts`
- **Styling:**
  - CSS files colocated with entry points (e.g., `App.css`, `index.css`)

## Workflows
- **Development:**
  - Start dev server: `npm run dev`
  - Build: `npm run build`
  - Preview: `npm run preview`
- **Linting:**
  - Lint: `npm run lint` (uses ESLint, see `eslint.config.js`)
  - Type-aware linting: configure `tsconfig.app.json` and `tsconfig.node.json`
- **Testing:**
  - No test setup detected — add tests in `src/` as needed

## Integration & Data Flow
- **API Calls:**
  - Use Axios instance from `src/utils/axios/Axios.ts`
  - Set auth headers via `AuthSetter.ts`
- **Component Communication:**
  - Prefer props for parent-child; consider context for cross-tree state

## External Dependencies
- **Vite** for build/dev
- **ESLint** for linting (see `eslint.config.js`)
- **Axios** for HTTP requests

## Examples
- To add a new page: create a component in `src/components/layout/` and route as needed
- To add a new UI element: add to `src/components/ui/`
- To add a new API service: extend `src/services/` and configure Axios as needed

---
For more details, see `README.md` and `eslint.config.js`.
