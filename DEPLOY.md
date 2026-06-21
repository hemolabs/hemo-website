# Déploiement Netlify

Site statique mono-fichier (`index.html`), sans étape de build.

## Mise en ligne

1. **Connecter le repo** sur Netlify (New site → Import from Git) — ou glisser-déposer le dossier dans Netlify Drop pour un test rapide.
2. Réglages de build : **aucun** (laisser vide). `netlify.toml` fixe déjà `publish = "."`.
3. Déployer.

## URLs par landing page (attribution des campagnes)

Chaque outil a sa propre URL, à utiliser comme destination d'une pub distincte :

| Page | URL |
|------|-----|
| Accueil | `/` |
| Suivi des analyseurs | `/suivi-analyseurs` |
| Pilotage & délais | `/pilotage` |
| Assistant | `/assistant` |
| Site + rendez-vous | `/site-rendez-vous` |
| Système (SGL) | `/systeme-sgl` |
| Diagnostic (formulaire) | `/diagnostic` |

Le deep-link fonctionne : ouvrir `/pilotage` affiche directement cette page (rewrite Netlify → `index.html`, puis le JS lit l'URL).
Ajoutez les paramètres `?utm_source=...&utm_campaign=...` à vos liens pubs — GA4 les capte automatiquement.

## À remplir avant la mise en production

- [x] **Google Analytics** : ID GA4 `G-KWJ8NEV7ZJ` en place dans `index.html`.
  - ⚠️ Audience médicale : ajoutez une bannière de consentement cookies (GA4 dépose des cookies). À défaut, envisagez un mode sans cookie.
- [x] **Domaine** : `https://hemo-labs.com` (canonical, Open Graph, `sitemap.xml`, `robots.txt`). Pensez à le pointer vers Netlify (Domain settings) et à activer le HTTPS.
- [ ] **Formulaire** : dans Netlify → Forms, activer les notifications par e-mail (le formulaire `diagnostic` est détecté automatiquement au premier déploiement).
- [ ] **Contact humain** : renseigner nom + téléphone algérien dans le bloc « Parlez à quelqu'un » (levier de confiance le plus fort).

## Mesure (GA4)

Événements déjà câblés :
- `page_view` — une vue par landing page (navigation SPA incluse).
- `cta_diagnostic` — clic sur un bouton menant au diagnostic (avec `source` = page d'origine).
- `generate_lead` — formulaire de diagnostic envoyé avec succès (avec `source`).

Les leads arrivent dans **Netlify → Forms** (et par e-mail une fois les notifications activées).
