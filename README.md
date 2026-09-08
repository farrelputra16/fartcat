# FARTCAT

The ultimate meta-mashup memecoin on Solana — holding $FARTCAT continuously feeds $FARTCOIN rewards straight into your wallet via OTC.

## Stack

- **Framework:** React 18 + Vite + TypeScript
- **Styling:** Pure CSS with custom properties (terminal design system)
- **Fonts:** VT323 (display), JetBrains Mono (body)
- **Deploy:** Vercel

## Getting Started

```bash
npm install
npm run dev      # Development server
npm run build    # Production build
```

## Production Deployment (Vercel)

### Option 1 — Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

### Option 2 — GitHub + Vercel Dashboard
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select the repository
4. Framework: **Vite** (auto-detected)
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Deploy

### Environment Variables
Copy `.env.example` to `.env` and set:
```
VITE_CONTRACT_ADDRESS=your_fartcat_contract_address_here
```

## Updating the Contract Address

When the FARTCAT CA is released:

1. Update `VITE_CONTRACT_ADDRESS` in Vercel project settings (or `.env` locally)
2. The site reads it via `import.meta.env.VITE_CONTRACT_ADDRESS`
3. Rebuild and redeploy

For now, all Buy buttons link to **https://pump.fun** — update those links in:
- `src/components/Hero.tsx`
- `src/components/CTASection.tsx`

## Project Structure

```
src/
  components/
    BootSequence.tsx    # Boot sequence on load
    ScanlineOverlay.tsx # CRT scanline effect
    NavBar.tsx         # Sticky nav
    Hero.tsx           # Hero + cat image + particles
    About.tsx          # Narrative + mechanics
    Rewards.tsx        # OTC reward engine
    Tokenomics.tsx     # Contract specs + CA banner
    Roadmap.tsx        # ASCII timeline
    CTASection.tsx     # Buy CTA
    Footer.tsx
    TypewriterText.tsx
    GlitchText.tsx
    FartParticles.tsx
  App.tsx
  main.tsx
  index.css            # Design system + keyframes
```

## Links

- **Twitter/X:** https://x.com/fartcat_otc
- **Pump.fun:** https://pump.fun
