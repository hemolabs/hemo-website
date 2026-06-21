---
name: hemo-critic
description: Critique the Synaps/Hemo vitrine site (the single-file index.html landing pages) for conversion and trust with Algerian medical-lab directors. Use when reviewing or improving the site's copy, UX, trust signals, CTAs, or the diagnostic form — or when asked "would a lab owner understand this / be convinced / actually fill the form?". Combines a 4-persona mystery-shopper panel with a research-backed UX + marketing rubric and returns per-page scores, blocking objections, and prioritized, copy-ready fixes.
---

# Hemo Critic — landing-page conversion & trust review for Algerian medical labs

## What this does
Critiques the Synaps/Hemo marketing site (the single self-contained `index.html`, with SPA pages `home`, `middleware`, `dashboard`, `assistant`, `site`, `lis`, `diagnostic`) against its one real goal: getting **Algerian lab directors** (médecins / directeurs de laboratoire, ~30–60, skewing 45–60) to trust it and submit the **diagnostic** form. It applies two lenses:

1. A **4-persona mystery-shopper panel** — realistic Algerian lab owners read each page cold and answer: *do I understand the offer? am I attracted? would I actually submit the form (with my real phone)?*
2. A **research-backed rubric** (`references/rubric.md`) across clarity, trust/credibility, social proof, funnel integrity, form UX, offer/economics, data & privacy, conformity honesty, healthcare UX, and accessibility for 45–60 readers.

**Output:** per-page conversion score (0–100), verdict (**bounce <35 / borderline 35–59 / convert ≥60**), the blocking objections, and a prioritized, copy-ready fix list (French where it's site copy).

## When to use
- Reviewing or improving any vitrine copy, layout, trust block, CTA, or the diagnostic form.
- Answering "would a lab owner convert / fill the form on this page?"
- Measuring the before/after delta of a change.

## How to run

### Quick critique (default — inline, no extra tools)
1. Read the target page(s) in `index.html` (find each `<div class="page" id="page-…">` block plus the shared nav, footer, and the diagnostic form).
2. Score every dimension in `references/rubric.md`.
3. Pressure-test with `references/personas.md` — for each page, judge *understand / attracted / will-submit* as each persona, being honestly skeptical (this audience distrusts marketing).
4. Report using the **Output format** below.

Always ground the critique in `references/audience.md` (who this is for, tone, trust framework) and `references/principles.md` (the evidence + sources). When the finding touches clinical/patient UX or older-reader legibility, also load `references/healthcare-ux.md`.

### Full panel (high-rigor — optional, needs Workflow/multi-agent enabled)
For a thorough, independent before/after, run `assets/persona-panel.workflow.js`:
1. Extract each landing page's **visible copy** from the current `index.html`.
2. Call the Workflow tool: `{ scriptPath: "<this skill>/assets/persona-panel.workflow.js", args: { pages: [{ id, label, copy, prev }] } }` (`prev` = prior score for delta; optional). You may also pass `args.personas` to override the defaults.
3. It fans out **4 personas × N pages → per-page synthesis → overall verdict** (including whether the 3 root causes are resolved). ~36 agents; use when the user wants real verification, not a quick read. Relay the returned JSON as the report.

If multi-agent isn't available, do the quick critique instead — never block on the workflow.

## Output format
Per page:
- **Score / verdict** (+ Δ vs prior if re-testing).
- **Understand? / Attracted? / Submit?** — one line each.
- **Top blocking objections** — what actually kills conversion.
- **Prioritized fixes** — concrete and copy-ready (French for site copy), tagged effort (low/medium/high).

Then **overall**: ranked pages, cross-cutting weaknesses, the single biggest conversion risk, and (for re-tests) the status of the 3 root causes.

## Hard rules (never violate — from the project docs)
- **French only**, vouvoiement, warm and plain. No startup/tech hype, no "x2 / doublez votre revenu", no dark/acid/tech aesthetics.
- **Proof > promise.** Let the free diagnostic produce the number; never headline a revenue multiple.
- Trust framework is **ISO 15189 / GBEA / OAA** — never HIPAA/CLIA. Software is *not* accredited (the lab is); say **"conçu pour votre démarche d'accréditation"**, not "conforme ISO 15189".
- **Never fabricate** a testimonial, client/lab name, contact name, phone, address, or legal identity. If missing, recommend adding it and mark a reserved slot — do not invent it.
- Keep the **LIS/SGL** as the discreet long-term horizon, never the entry product; don't route ads to `/systeme-sgl`.
- The **diagnostic CTA is the primary action**; flag any CTA whose promise ≠ its destination (bait-and-switch) and any mock data not labelled as an example.

## Fast triage — the 3 recurring root causes
The audit consistently surfaces these; check them first:
1. **Trust asymmetry** — the site asks for the prospect's phone while showing no real human, number, legal identity, or local reference. The #1 conversion killer for this audience.
2. **Bait-and-switch CTAs** — product buttons routing to an off-subject form.
3. **No local social proof** — no named lab + wilaya; reads as "I'd be the cobaye".

Detail lives in `references/` (rubric, personas, principles, healthcare-ux) and the runnable panel in `assets/`.
