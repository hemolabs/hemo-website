# CLAUDE.md

Context for Claude Code working on this repository.

## What this project is

We are building **Synaps** (working name — replace with the real brand), a modular software ecosystem for **medical laboratories** (laboratoires de biologie médicale). The long-term product is a full **LIS / SGL** (Laboratory Information System / Système de Gestion de Laboratoire), but the go-to-market strategy deliberately leads with smaller, lower-risk "side tools" and treats the LIS as the long-term horizon, not the entry point.

The repo currently contains the **marketing/vitrine site** used to test market appetite for each tool via landing pages.

## Target market (critical — drives all copy & design decisions)

- **Who:** doctors (médecins) and lab directors (directeurs de laboratoire) in **Algeria**, aged roughly **30–60**, skewing 45–60.
- **Language:** **French only.** Use "SGL" not "LIS/SIL". Currency "DA" (dinar algérien).
- **Tone:** warm, human, relational. NO startup/tech hype, NO "disruption / x2 / growth-hack" vocabulary — it makes this audience distrust you. Vouvoiement, plain sentences, "the doctor decides".
- **Trust framework:** local references are **ISO 15189** and **GBEA** (Guide de Bonne Exécution des Analyses), accreditation via **OAA** (Organisme Algérien d'Accréditation). NOT HIPAA/CLIA (those are US). Algeria has no software-specific medical-device regulation yet, so trust is built through: conformity signals (ISO 15189 / GBEA), a real human contact (name + Algerian phone), data protection, and — once available — named local testimonials (with wilaya).
- Competitors on the ground: SoftLAM, Winlabo (CCIF), Technidata. They all foreground ISO 15189 accreditation support.

## Core GTM strategy (the "why" behind everything)

Migrating a lab's LIS is heavy, scary, high-switching-cost. So instead of selling the LIS first, we **enter with light side tools**, prove value with the lab's own data, build trust, and only then propose the LIS. Motto: **"Sans migration. Sans risque. À votre rythme."** ("No migration. No risk. At your pace.")

The single strongest sales motion is a **free diagnostic / audit** ("diagnostic offert"): we analyze the lab's own activity + billing and show them a real, attributable number (leaked revenue, missed billing). Proof replaces promises. We never promise "double your revenue" as a headline — it destroys credibility with this audience. We let the audit produce the number.

See `docs/STRATEGY.md` for the full reasoning, `docs/PRODUCTS.md` for the tool catalog, `docs/SITE.md` for the website spec.

## Repo conventions

- The vitrine site is a **single self-contained `index.html`** (SPA-style page switching via a `go(pageId)` JS function, no router/build step). Pages: `home`, `middleware`, `dashboard`, `assistant`, `site`, `lis`.
- **No external runtime dependencies** beyond Google Fonts (Fraunces + Inter). No localStorage/sessionStorage.
- Design tokens live in `:root` CSS variables — see `docs/SITE.md` for the palette. Do not reintroduce dark/tech aesthetics.
- All user-facing copy is **French**. Keep it warm and plain.

## What NOT to do

- Don't headline the LIS or "double revenue" — keep the LIS as the discreet long-term horizon.
- Don't use US compliance terms (HIPAA/CLIA). Use ISO 15189 / GBEA.
- Don't add tech-bro / startup tone, dark themes, or acid colors.
- Don't put percentage-of-recovered-revenue pricing live without a legal note — see `docs/STRATEGY.md` (kickback/fee-splitting rules vary; needs a healthcare lawyer in Algeria).
- Don't claim a physical address or testimonials we don't yet have.

## Open items / placeholders to fill

- Real brand name (currently "Synaps").
- Real human contact: name + Algerian phone in the "Parlez à quelqu'un" block (highest-trust lever).
- First named testimonial (with wilaya) once a lab is onboard — reserve a slot for it.
- Confirm how each target lab's existing LIS can be read (API vs scheduled HL7 exports vs DB access) — this gates the RCM product. See `docs/TECH_NOTES.md`.
