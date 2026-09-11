This is the active [Next.js](https://nextjs.org) application for Dev With Tito.

## Toolchain

- Node.js `24.15.0` (see `.nvmrc`)
- npm `11.6.2` (the only supported package manager)
- `package-lock.json` is the authoritative dependency lockfile

With nvm installed:

```bash
nvm install
nvm use
npm install --global npm@11.6.2
npm ci
```

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

`npm run check` runs all four gates in sequence. `npm run audit:prod` fails on high or critical production dependency vulnerabilities. GitHub Actions runs the same gates for pushes and pull requests.

## Legacy package

`personal-portfolio/` is an archived 2022 Create React App reference. It is not imported, deployed, or included in the active application's lint, typecheck, test, build, or security gates. See its README and `STABILIZATION_PLAN.md` for the disposition rationale.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
