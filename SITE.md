# SITE.md — Vitrine website spec

## Purpose
Marketing site to **test market appetite** for each tool via landing pages, and route everyone to the free diagnostic CTA. Audience: Algerian doctors/lab directors 45–60. See CLAUDE.md for tone rules.

## Structure
Single self-contained `index.html`, SPA page-switching via `go(pageId)` (no router/build). `goDiag()` jumps to the diagnostic CTA on home.

Pages: `home`, `middleware`, `dashboard`, `assistant`, `site`, `lis`.

- **Home:** hero "Nous avançons *avec vous*, à votre rythme." + trust bar (ISO 15189 / GBEA / data protection) + tool grid + "Comment ça se passe" 3 steps (on échange / on vous montre / vous décidez) + free diagnostic banner + human-contact block + discreet LIS "whisper" footer-section.
- **Each product page:** pain-led headline → lead paragraph → a fake-but-realistic visual card (live monitor / KPI dashboard / chat / reservation widget / SLA card) → 3 feature cells → 3 proof stats → a "sans migration / sans risque" reassurance pill. One CTA per page (all route to `goDiag()`), so each landing's conversion can be measured cleanly.
- **LIS page:** 99,9% SLA + "sinon on vous rembourse" guarantee card + ISO/GBEA conformity. Framed as the horizon ("Vous y venez après avoir éprouvé nos outils. Pas avant.").

## Design tokens (CSS :root) — DO NOT revert to dark/tech
Warm, light, medical-Mediterranean. Calm and reassuring, not flashy.
```
--paper:#FBF8F2  --paper-2:#F4EEE3  --card:#FFFFFF
--ink:#1C2B33    --ink-soft:#43565F  --muted:#7A8A91
--blue:#1F5673   --blue-deep:#16435A          (medical trust blue)
--emerald:#2C8C7C  --emerald-soft:#E4F0ED      (soft clinical green)
--amber:#C9742E    --amber-soft:#F6E9DC        (terracotta warmth)
--line:#E6DECF
```
Type: **Fraunces** (serif display, warm, human) for headings; **Inter** for body. The serif display is the personality lever; keep body plain and legible (audience is 45–60, prioritize readability).

## Copy rules
- French only. Vouvoiement. Plain verbs, sentence case, no filler, no hype.
- Recurring reassurance line everywhere: "Sans migration. Sans risque. À votre rythme."
- LIS = "SGL" / "système complet". Currency = DA.
- Diagnostic CTA is the primary action across the whole site.

## Testing note
Current build is one HTML file — great for validating content/tone, weaker for per-product analytics. To A/B appetite per tool, split into separate landing URLs each with its own tracking pixel.

## Placeholders to replace
- Brand name "Synaps".
- Human-contact block: avatar "SM" + "appelez-nous" → real name + Algerian phone (highest-trust lever; do not leave generic).
- Reserve a slot for a first named testimonial (with wilaya) once a lab is onboard.
