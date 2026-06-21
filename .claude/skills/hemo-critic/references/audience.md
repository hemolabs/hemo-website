# Audience & context (drives every judgment)

Condensed from the project docs (`CLAUDE.md`, `STRATEGY.md`, `PRODUCTS.md`, `PITCH.md`, `SITE.md`, `TECH_NOTES.md`). When these differ from this file, the repo docs win — re-read them.

## Who
- **Médecins** and **directeurs de laboratoire** of medical labs (laboratoires de biologie médicale) in **Algeria**, ~**30–60, skewing 45–60**.
- Skeptical of marketing; decide on **trust and word-of-mouth between confrères**, slowly, multi-stakeholder. Often already run a black-box LIS (SoftLAM, Winlabo/CCIF, Technidata) they won't risk disrupting.

## Language & tone
- **French only.** Vouvoiement. Warm, human, relational, plain sentences.
- **No** startup/tech hype, no "disruption / growth / x2", no dark or acid-colour tech aesthetics. Hype destroys credibility here.
- Currency **DA**. Use **"SGL"** (not LIS/SIL) in copy.

## Trust framework (local, non-negotiable)
- Conformity signals = **ISO 15189**, **GBEA** (Guide de Bonne Exécution des Analyses), accreditation via **OAA**. **Never** HIPAA/CLIA (US).
- A logiciel is **not accredited** — the **lab** is. Say "conçu pour soutenir votre démarche d'accréditation", never "conforme ISO 15189".
- Algeria has no software-specific medical-device regime yet → trust is built through: conformity signals, a **real human contact** (name + Algerian phone), **data protection**, and **named local testimonials with wilaya** once available.

## Strategy the site serves
- **Wedge, not flagship.** Lead with light, low-risk side tools; the LIS/SGL is the discreet long-term horizon. Motto: **"Sans migration. Sans risque. À votre rythme."**
- **Hero motion = the free diagnostic** ("diagnostic offert"): analyse the lab's own activity + billing, hand back a real, attributable number (leaked/uncollected revenue). **Proof replaces promises** — never headline "double your revenue".
- **Legal flag:** outcome/percentage-of-recovered-revenue pricing touches fee-splitting/anti-kickback rules → keep it off the site until a healthcare lawyer in Algeria validates it.

## Two install modes (why some claims must be careful)
- **Isolated** (no LIS access) vs **read-only** (reads the LIS, never writes). Read-only value ≥ isolated value, always.
- Middleware (analyzer monitoring via HL7/ASTM) is the safest entry — works with zero LIS access. RCM/billing audit needs read-only. First qualifying question: *"can we get read-only access to your LIS?"*

## What "good" looks like for this audience
Relevance first → credibility second → process clarity third → low-friction next action. A real person, reachable. Honest, qualified numbers. One named confrère with a wilaya is worth more than the whole page.
