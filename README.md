# amer-oun.vercel.app — Portfolio

Personal portfolio and interactive terminal. Built with Next.js 15 · TypeScript · Tailwind CSS.

[![CI](https://github.com/amer-oun/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/amer-oun/portfolio/actions/workflows/ci.yml)

## Structure

- `/` — main portfolio (hero, work, about, skills, contact)
- `/terminal` — interactive terminal emulator (type `help` to explore)

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy

Deploys automatically to Vercel on push to `main`.

## Customize

- **Content**: `lib/data.ts` — profile, projects, skills, boot lines
- **Main page**: `app/page.tsx`
- **Terminal commands**: `components/Terminal.tsx` → `runCommand()`
- **Colors**: `tailwind.config.ts` → `theme.extend.colors`

## License

MIT — see [LICENSE](./LICENSE).
