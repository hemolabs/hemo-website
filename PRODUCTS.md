# PRODUCTS.md — Tool catalog

The ecosystem is a set of modular "bricks". Each is sold/installed independently and they interoperate. The LIS/SGL is the long-term apex, kept discreet in marketing.

## The two installation modes (key concept)
Every tool is installed in one of two modes relative to the lab's existing (black-box, proprietary, unknown) LIS:
- **Mode 1 — No access to the LIS (isolated):** the tool runs in a silo, blind to the LIS. It can only use data it generates or captures itself.
- **Mode 2 — Read-only access to the LIS:** the tool can *read* the LIS data (orders, results, billing) but never writes.

**Hard rule:** a tool's value in read-only is ALWAYS ≥ its value in isolated mode. More data never reduces value. (We corrected an earlier table that wrongly showed some tools "losing" value with access — that was confusing "less strategically unique in our portfolio" with "less valuable to the lab". Never repeat that error.)

Tools split into two families:
- **Live outside the LIS** (same value in both modes): analyzer middleware, intake automation, HR, website.
- **Feed on LIS data** (low isolated, high read-only): assistant IA, patient portal, dashboard/TAT, RCM/billing audit.

## Value matrix (orders of magnitude; benchmarks mostly US — confirm per lab)

| Tool | Isolated /5 | Read-only /5 | What LIS access adds |
|---|---|---|---|
| Analyzer monitoring / middleware | 5 | 5 | Already maxed; access adds billing↔volume reconciliation + LIS anomaly/bug detection |
| Intake automation (IA reads scripts + photo capture) | 4 | 4 | Nothing — works upstream of the LIS |
| Assistant IA (Q&A, script reading, training/QCM, onboarding) | 2 | 4 | Huge — becomes contextual on the lab's real data |
| Patient/physician portal (results + AI explanations) | 2 | 4 | Major — without LIS data it can't show results |
| Dashboard / TAT analytics | 1 | 4 | Total — nothing to analyze without data |
| HR / training / time-clock | 3 | 3 | Nothing — independent of the LIS |
| Website + reservation | 4 | 4 | Nothing — lives outside the LIS |
| Billing audit / RCM | 1 | 5 | Everything — the whole product needs to read billing |

### Reading of the matrix
- **Middleware** is the safest entry: 5/5 in both modes (it taps the analyzers via HL7/ASTM, not the LIS). Lead with it when access is uncertain.
- **RCM/billing audit** is the revenue king but ONLY works in read-only (1→5). It carries the whole "we show you your leaks" pitch. → First sales qualification question must be: "can we get read-only access to your LIS?"
- Read-only is itself a mini-wedge: easy to grant (no write risk), and it unlocks the high-value half of the catalog.

## The tools shipped on the current vitrine site
1. **Suivi des analyseurs** (analyzer monitoring) — pain entry: "Vos analyseurs tombent en panne sans prévenir ?"
2. **Pilotage & délais de rendu (TAT)** — KPIs, benchmarking, alerts. "+20% urgent capacity by cutting pre-analytical TAT 30 min, no capex."
3. **Assistant IA labo** — combined tool: answers questions + reads messy scripts + pushes training/QCM + onboards recruits. Headline used: "un assistant qui double la productivité de votre équipe" (note: keep the doubling claim scoped to assisted tasks, not whole-lab revenue).
4. **Site web + réservation** — OFFERED FREE. "On vous fait gratuitement une landing page + système de résa." Hook: photo-of-order auto-capture works best with our LIS.
5. **Système complet (SGL / LIS)** — "le plus sûr du marché, SLA 99,9%, sinon on vous rembourse." Kept as horizon.
6. **Réseau de laboratoires** — "Bientôt": connected prescribers, subcontracting, group purchasing. Vision, not a current promise.

## Notes on specific tools
- Website's real value to us is the **order intake hook**, not the website itself (commodity).
- Assistant IA has real compute cost → never free; meter usage.
- HR tool & website are mode-independent → can be deployed without negotiating LIS access.
