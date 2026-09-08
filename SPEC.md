# FARTCAT — SPEC.md

## 1. Concept & Vision

**FARTCAT** is a memecoin landing page that weaponizes terminal aesthetics into a full sensory experience. The page feels like you've cracked open a crypto trading terminal from 2040 — dark phosphor glow, scanlines, glitch artifacts, a cat character doing its business on-chain. Every interaction should feel like executing a command. The vibe: absurdly premium hacker energy meets pure memecoin chaos.

**Narrative:** Fartcoin proved raw absurdity drives volume. Cat tokens are the next meta. FARTCAT merges both — holding $FARTCAT continuously rewards you with $FARTCOIN via OTC mechanism.

**Twitter:** https://x.com/fartcat_otc

---

## 2. Design Language

### Aesthetic Direction
**Phosphor Terminal / Retro Hacker** — Think green/amber CRT monitors, blinking cursors, ASCII art cats, scanline overlays, and glitch text. The visual DNA of a late-80s terminal fused with modern motion design.

### Color Palette
| Role        | Hex       | Usage                                |
|-------------|-----------|--------------------------------------|
| Background  | `#050a05` | Page background — near-black green tint |
| Surface     | `#0a140a` | Card/panel backgrounds              |
| Border      | `#1a3a1a` | Subtle terminal borders              |
| Primary     | `#00ff41` | Main text — phosphor green (matrix)   |
| Secondary   | `#39ff14` | Accent highlights, glows             |
| Amber       | `#ffb000` | Warnings, fart gas glow              |
| Muted       | `#2a5a2a` | Disabled, secondary text             |
| Text        | `#c8ffc8` | Body text, slightly dimmed green     |
| Red         | `#ff3333` | Error / hot alerts                   |

### Typography
- **Display:** `VT323` (Google Fonts) — authentic terminal monospace for headlines
- **Mono Body:** `JetBrains Mono` (Google Fonts) — readable terminal body text
- **Fallback:** `Courier New`, `monospace`
- **Scale:** 96px hero → 48px section → 24px body → 14px labels
- **Style:** ALL CAPS for labels, lowercase-ish for body (authentic terminal feel)

### Spatial System
- Base unit: 8px
- Section padding: 80px top/bottom
- Max content width: 1100px centered
- Border-radius: 0 (sharp terminal edges) or 2px max
- Grid: 12-col CSS Grid with tight gutters (16px)

### Motion Philosophy
- **Boot sequence** on load — lines of text typing in one by one
- **Typewriter effect** on headings — characters appear with a blinking cursor
- **Glitch** — random horizontal displacement + color split on hover for key elements
- **Fart particles** — CSS/JS animated "gas cloud" particles emitting from cat ASCII art
- **Scanline overlay** — fixed CRT scanline effect across entire page
- **Cursor blink** — 530ms blink interval, authentic terminal cursor
- **Hover:** elements "flicker" like a CRT receiving input

### Visual Assets
- **Icons:** Custom ASCII-art / Unicode glyphs (no external icon library — full terminal commitment)
- **Images:** ASCII art cat (hand-crafted), CSS-only fart cloud animation
- **Decorative:** Scanline overlay (CSS `repeating-linear-gradient`), CRT vignette (`radial-gradient`), static noise (`filter: url(#noise)`)
- **No emoji anywhere** — pure terminal character set only

---

## 3. Layout & Structure

### Page Architecture
```
[NAV] — Minimal sticky terminal bar
[HERO] — Full viewport, boot sequence → cat ASCII + headline
[ABOUT] — Split: narrative left, token mechanics right
[REWARDS] — How $FARTCOIN rewards work (OTC mechanism)
[TOKENOMICS] — Supply, CA, distribution (terminal table style)
[ROADMAP] — ASCII timeline
[CTA] — Buy / Hold FARTCAT call to action
[FOOTER] — Links, Twitter, legal
```

### Visual Pacing
- Hero: Full viewport, maximalist terminal chaos (scanlines, glow, ASCII cat)
- About: Dense but readable, left-right split
- Rewards: Centered with animated fart gas visual
- Tokenomics: Table-driven, minimal, dense
- Roadmap: Horizontal ASCII timeline with milestone dots
- CTA: Single loud button, dark background with phosphor green glow
- Footer: Minimal, same terminal style

### Responsive Strategy
- Mobile: Stack all columns, reduce ASCII art size, keep scanline effect
- Tablet: 2-col grid where applicable
- Desktop: Full terminal layout with side-by-side compositions

---

## 4. Features & Interactions

### Boot Sequence
- On page load: 8-12 lines of "system booting" text appear one by one (typewriter, 80ms per char)
- Lines: `$ init.fartcat`, `> loading memecoin.dll`, `> mounting /dev/cat`, etc.
- Total duration: ~3 seconds, then hero fades in

### Cat ASCII Animation
- ASCII cat art at bottom of hero section
- Every 4-6 seconds: cat "farts" — a burst of `~` `^` `*` `o` characters emits from cat's rear, floats upward and fades out
- Particle count: 12-18 per burst
- Colors: alternating `#00ff41` and `#ffb000`
- Accompanied by a subtle screen shake (CSS transform)

### Glitch Text Effect
- On hover of `.glitch` elements: random horizontal translation (-3px to +3px), brief color channel split (red/blue offset)
- Duration: 150ms burst, resets on mouse leave

### Typewriter Component
- Reusable `<Typewriter>` component
- Types text character by character with blinking cursor
- Supports "fast" mode (skip on click) and "slow" mode (full reveal)

### Scanline CRT Effect
- Fixed `::before` overlay with `repeating-linear-gradient` (1px dark lines every 3px)
- `pointer-events: none`, `z-index: 9999`
- Subtle vignette via `radial-gradient` darkening corners

### Buy Button / CTA
- Glowing phosphor green border, dark fill
- On hover: border brightens, inner text flickers
- Links to Twitter/X OTC contact

### Navigation
- Sticky top bar: `FARTCAT >` prompt on left, Twitter link on right
- Blinking cursor after prompt
- Background: semi-transparent with `backdrop-filter: blur(8px)`

---

## 5. Component Inventory

### `<TerminalWindow>`
- Outer frame with title bar: `[●] [●] [●] fartcat@node:~`
- Body: dark surface with inner padding
- States: default, focused (brighter border)

### `<TypewriterText>`
- Props: `text`, `speed`, `delay`, `onComplete`
- Shows blinking cursor after text completes
- Supports inline HTML tags (for colored segments)

### `<AsciiCat>`
- ASCII art cat in `<pre>` tag, monospace
- Exposes `fart()` method via ref to trigger particle burst
- Idle: cat is static
- Farting: CSS class added, triggers particle emission

### `<FartParticles>`
- Canvas or DOM-based particle system
- Spawns particles at given coordinates (near cat's rear)
- Particles: random `~^o*.` characters, float upward, fade out over 1.2s
- Color: oscillates between green and amber

### `<GlitchText>`
- Wraps any text/element
- On hover: CSS animation plays (clip-path + translate X jitter + color offset)

### `<ScanlineOverlay>`
- Fixed position, full viewport
- `repeating-linear-gradient` scanlines
- Radial vignette darkening
- SVG noise filter applied

### `<TokenTable>`
- Terminal-style bordered table
- Rows: Supply, Contract, Tax, LP, etc.
- Monospace, green on dark

### `<Roadmap>`
- Horizontal scroll on mobile
- ASCII connectors: `───●───●───●`
- Each node: `[PHASE] TITLE` with description below

### `<CTASection>`
- Single large centered block
- Headline + subtext + one button
- Button: phosphor glow, click-flicker animation

### `<NavBar>`
- Fixed top, 64px height
- Left: `$FARTCAT > _` with blinking cursor
- Right: `> twitter.com/fartcat_otc`
- Background: `rgba(5,10,5,0.85)` + blur

---

## 6. Technical Approach

### Stack
- **Framework:** React 18 + Vite + TypeScript
- **Styling:** Pure CSS (CSS Modules or vanilla CSS with custom properties) — no Tailwind
- **Animation:** CSS animations + vanilla JS for particles (no heavy libs)
- **Fonts:** Google Fonts (VT323, JetBrains Mono) via `<link>` in index.html
- **Build:** Vite, single-page static output

### Architecture
```
src/
  components/
    NavBar.tsx
    TerminalWindow.tsx
    TypewriterText.tsx
    AsciiCat.tsx
    FartParticles.tsx
    GlitchText.tsx
    ScanlineOverlay.tsx
    TokenTable.tsx
    Roadmap.tsx
    CTASection.tsx
    BootSequence.tsx
  App.tsx
  main.tsx
  styles/
    global.css
    components.css
    animations.css
  index.css
```

### Key Implementation Notes
- FartParticles use `requestAnimationFrame` loop for smooth particle motion
- ScanlineOverlay is a single fixed div — zero JS overhead
- Boot sequence is a React component that self-destructs after completing
- All colors as CSS custom properties on `:root`
- `prefers-reduced-motion`: disable particle system and boot sequence if set
