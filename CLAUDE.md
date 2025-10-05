# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

All commands are run from the root of the project:

- `pnpm install` - Install dependencies
- `pnpm dev` - Start development server at localhost:4321
- `pnpm build` - Build production site to ./dist/
- `pnpm preview` - Preview production build locally
- `pnpm astro` - Run Astro CLI commands

## Architecture

This is an Astro project for "The Borderline" literary magazine website. The project uses:

- **Astro** - Static site generator with component-based architecture
- **Tailwind CSS v4** - Styling via `@tailwindcss/vite` plugin
- **TypeScript** - Configured with strict Astro TypeScript settings

### Project Structure

- `src/pages/` - File-based routing, `index.astro` is the main page
- `src/layouts/` - Reusable layout components (Layout.astro includes global.css)
- `src/components/` - Reusable UI components (Welcome.astro contains the main interface)
- `src/assets/` - Static assets including hero images and social icons
- `public/` - Static files served directly

### Key Components

The main page features a circular menu layout with 5 sections (About, Community, Newsletter, Projects, Magazine) positioned around a central title. The Welcome.astro component contains all the interactive elements including:

- Circular positioning logic using CSS custom properties and transforms
- Responsive design for mobile/tablet screens
- Post-it style "Read Now" button with handwritten font (Kalam)
- Social media links in the footer

### Styling Approach

- Global styles in `src/global.css` (imports Tailwind)
- Component-specific styles in `<style>` blocks within .astro files
- Uses modern CSS features like backdrop-filter, custom properties, and transforms
- Responsive breakpoints at 768px and 480px