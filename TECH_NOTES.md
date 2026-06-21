# TECH_NOTES.md — Integration realities

## The black-box LIS problem
Target labs already run a **proprietary LIS we don't know and don't control**. Our tools install in one of two modes (see PRODUCTS.md): isolated (no access) or read-only (can read its data).

## Read-only is often a *technical* challenge, not just permission
"Read-only access" sounds simple but a black-box LIS may expose no API. Access then comes through one of:
- a vendor-provided API (best case, often absent),
- direct DB read (often contractually forbidden by the incumbent vendor),
- scheduled HL7 / file exports,
- a dedicated interface the incumbent vendor bills for.

**Before promising the RCM/read-only products to a given lab, verify HOW we can actually read that specific LIS.** This is where projects stall — not in our code.

## What's vendor-independent
- **Analyzer middleware** taps the instruments directly via **HL7 / ASTM** (serial RS232 or LAN), bypassing the LIS entirely → works even with zero LIS access. This is why it's the safest entry product. It also does ~80% of the HL7/ASTM integration work an eventual LIS migration would need.
- **Intake automation, HR, website** live outside the LIS → no access needed.

## Standards & compliance to design around (Algeria)
- **ISO 15189** (medical lab accreditation), **GBEA** (good-practice guide), accreditation by **OAA**.
- HL7 is the interoperability backbone (as with local players like Technidata/TDNexLabs).
- Algeria currently regulates medical software under general medical-device rules — no software-specific regime yet. Design for ISO 15189 traceability expectations regardless.

## First sales-qualification question (drives architecture)
"Can we get read-only access to your LIS?"
- **Yes** → full RCM/diagnostic pitch (the six-figure-leakage story) is live.
- **No** → pivot to middleware + intake + website + HR (all isolated-mode capable); negotiate read-only later as a trust step.
