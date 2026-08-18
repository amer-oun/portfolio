# amer-oun.vercel.app — Terminal Portfolio

Interactive terminal-emulator portfolio. Type `help` on the site to explore.

Built with Next.js 15 · React 19 · TypeScript · Tailwind CSS. Deploys to Vercel.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy

1. Push this repo to GitHub as `amer-oun/portfolio`
2. Import into https://vercel.com → New Project → pick the repo → Deploy
3. Add a custom domain later if you want (Vercel → Settings → Domains)

## Customize

- **Content**: edit `lib/data.ts` — profile, projects, skills, boot lines.
- **Commands**: add cases in `components/Terminal.tsx` → `runCommand()`.
- **Colors**: `tailwind.config.ts` → `theme.extend.colors`.
- **Boot animation speed**: `components/Terminal.tsx` → `setTimeout(r, 120)` in the boot `useEffect`.

## License

MIT
