// hemo-critic — persona conversion panel (run via the Workflow tool).
//
// Usage: Workflow({ scriptPath: ".../assets/persona-panel.workflow.js", args: { pages, personas? } })
//   args.pages: [{ id, label, copy, prev? }]  — copy = the page's VISIBLE text, extracted from index.html
//                                                 prev = prior score for delta (optional)
//   args.personas (optional): [{ key, name, profile }] to override the defaults below.
//
// Returns { pages:[per-page synthesis], overall } as JSON — relay it as the report.
// Fans out 4 personas × N pages → per-page synthesis → overall verdict (~4*N + N + 1 agents).

export const meta = {
  name: 'hemo-critic-persona-panel',
  description: 'Algerian lab-owner personas judge each landing page: understand the offer? attracted? would they submit the form?',
  phases: [
    { title: 'Persona reviews', detail: '4 personas × N pages, independent verdicts' },
    { title: 'Per-page synthesis', detail: 'aggregate each page panel + delta vs baseline' },
    { title: 'Overall synthesis', detail: 'rank pages, root-cause status, bottom line' },
  ],
}

const SHARED_NAV = `Logo « Synaps » | Suivi analyseurs · Pilotage · Assistant · Site & rendez-vous · Système (SGL) | bouton: « Diagnostic offert »`
const SHARED_FOOTER = `Synaps — outils pour laboratoires de biologie médicale. « Sans migration. Sans risque. À votre rythme. »`

const DEFAULT_PERSONAS = [
  { key:'karim', name:'Dr Karim Benali, 56 ans', profile:`Directeur d'un laboratoire privé établi à Alger, 25 ans de métier, équipe de 18, déjà sous LIS SoftLAM. Très prudent, échaudé par le marketing, accréditation ISO 15189 (OAA) en cours. Méfiant, valorise le contact humain et les références locales (confrères, wilaya), décide lentement. Ne donne pas son numéro à la légère — veut appeler lui-même.` },
  { key:'amine', name:'Dr Amine Cherif, 37 ans', profile:`Co-gérant d'un labo en croissance à Oran, 2 sites, à l'aise avec le numérique, orienté efficacité/rentabilité, très impatient (5 secondes pour le convaincre), ouvert à tester un outil gratuit/sans risque.` },
  { key:'farida', name:'Dr Farida Saïdi, 50 ans', profile:`Directrice d'un petit labo à Sétif, équipe de 6, budget serré, pragmatique, prudente sur les coûts cachés (« où est le piège ? »), valorise le bouche-à-oreille entre confrères. Veut un bénéfice concret pour un petit labo.` },
  { key:'rachid', name:'M. Rachid Boukhalfa, 61 ans', profile:`Propriétaire d'un réseau de 3 labos (Alger/Blida), profil gestionnaire/financier, obsédé par l'encaissement et les fuites de facturation, le pilotage multi-sites, la fiabilité. Préfère appeler lui-même ou être recommandé par un confrère plutôt que remplir un formulaire web.` },
]

const PERSONAS = (typeof args === 'object' && args && Array.isArray(args.personas) && args.personas.length) ? args.personas : DEFAULT_PERSONAS
const PAGES = (typeof args === 'object' && args && Array.isArray(args.pages)) ? args.pages : []
if (!PAGES.length) throw new Error('hemo-critic: pass args.pages = [{id,label,copy,prev?}] (visible copy extracted from index.html).')

const VERDICT_SCHEMA = {
  type:'object', additionalProperties:false,
  required:['persona','understandsObjective','valueInOneRead','attracted','willFillForm','conversionScore','objections','verbatim'],
  properties:{
    persona:{type:'string'},
    understandsObjective:{type:'boolean'}, valueInOneRead:{type:'boolean'},
    attracted:{type:'string', enum:['yes','maybe','no']},
    willFillForm:{type:'string', enum:['yes','maybe','no'], description:'soumettrait réellement le formulaire avec ses coordonnées (téléphone ou e-mail)'},
    conversionScore:{type:'integer', minimum:0, maximum:100},
    whatWorks:{type:'array', items:{type:'string'}},
    objections:{type:'array', items:{type:'string'}},
    verbatim:{type:'string', description:'réaction spontanée, première personne, en français'},
  }
}

const PAGE_SCHEMA = {
  type:'object', additionalProperties:false,
  required:['pageId','pageLabel','avgScore','verdict','understandObjectiveSummary','attractedSummary','fillFormSummary','topObjections','topFixes','bestLine','worstLine','verbatims'],
  properties:{
    pageId:{type:'string'}, pageLabel:{type:'string'},
    avgScore:{type:'integer'}, previousScore:{type:'integer'}, delta:{type:'integer'},
    verdict:{type:'string', enum:['convert','borderline','bounce'], description:'convert≥60 / borderline 35-59 / bounce<35'},
    understandObjectiveSummary:{type:'string'}, attractedSummary:{type:'string'}, fillFormSummary:{type:'string'},
    topObjections:{type:'array', items:{type:'string'}},
    topFixes:{type:'array', items:{type:'string'}, description:'corrections concrètes, copie en français si pertinent'},
    bestLine:{type:'string'}, worstLine:{type:'string'},
    verbatims:{type:'array', items:{type:'string'}},
  }
}

const OVERALL_SCHEMA = {
  type:'object', additionalProperties:false,
  required:['rankedPages','rootCauseStatus','crossCuttingWeaknesses','prioritizedFixes','biggestConversionRisk','bottomLine'],
  properties:{
    rankedPages:{type:'array', items:{type:'object', additionalProperties:false, required:['pageId','avgScore','verdict'], properties:{pageId:{type:'string'},avgScore:{type:'integer'},verdict:{type:'string'}}}},
    rootCauseStatus:{type:'array', items:{type:'object', additionalProperties:false, required:['cause','status','note'], properties:{cause:{type:'string'},status:{type:'string',enum:['resolved','partial','unresolved']},note:{type:'string'}}}, description:'1) asymétrie de confiance 2) bait-and-switch CTA 3) preuve locale'},
    crossCuttingWeaknesses:{type:'array', items:{type:'string'}},
    prioritizedFixes:{type:'array', items:{type:'object', additionalProperties:false, required:['fix','pages','effort'], properties:{fix:{type:'string'},pages:{type:'array',items:{type:'string'}},effort:{type:'string',enum:['low','medium','high']}}}},
    biggestConversionRisk:{type:'string'},
    bottomLine:{type:'string', description:'2-3 phrases: ce site convertirait-il des directeurs de labo algériens ?'},
  }
}

function personaPrompt(page, persona){
  return `Tu es ${persona.name}. ${persona.profile}

Tu cliques sur une publicité qui t'amène DIRECTEMENT sur cette page (tu vois cette page, la barre de navigation en haut, le pied de page). Site « Synaps » pour laboratoires de biologie médicale en Algérie.

=== NAVIGATION ===
${SHARED_NAV}
=== PAGE « ${page.label} » ===
${page.copy}
=== PIED DE PAGE ===
${SHARED_FOOTER}

Le bouton principal mène à un formulaire de contact (« diagnostic offert » / démo) qui demande nom, laboratoire, wilaya, et un moyen de contact (téléphone ou e-mail). « Remplir le formulaire » = le soumettre réellement avec tes coordonnées.

Réagis HONNÊTEMENT et de façon RÉALISTE, en directeur algérien méfiant et prudent qui ne donne pas son numéro à un inconnu sans raison solide. Ne sois pas complaisant. Évalue:
1. understandsObjective: comprends-tu sans effort, en une lecture, ce qu'on t'offre ET ce qu'on attend de toi ?
2. valueInOneRead: la valeur t'apparaît-elle immédiatement ?
3. attracted (yes/maybe/no)
4. willFillForm: soumettrais-tu réellement le formulaire ? (yes/maybe/no)
5. objections: ce qui te freine.
6. conversionScore 0-100: probabilité réelle de soumettre.
7. verbatim: ta réaction à la première personne, en français.
Renseigne 'persona' = « ${persona.name} ».`
}

const results = await pipeline(
  PAGES,
  (page) => parallel(PERSONAS.map(persona => () =>
    agent(personaPrompt(page, persona), {label:`review:${page.id}:${persona.key}`, phase:'Persona reviews', schema:VERDICT_SCHEMA})
  )).then(vs => ({page, verdicts: vs.filter(Boolean)})),
  ({page, verdicts}) => agent(
    `Analyste conversion. Landing page « ${page.label} »${page.prev!=null?` (score baseline AVANT = ${page.prev}/100)`:''}.
Verdicts des personas (JSON):
${JSON.stringify(verdicts, null, 1)}
Synthétise: avgScore = moyenne des conversionScore${page.prev!=null?`, previousScore=${page.prev}, delta=avgScore-${page.prev}`:''}; verdict (convert≥60 / borderline 35-59 / bounce<35); comprennent-ils l'objectif/la valeur ? sont-ils séduits ? rempliraient-ils le formulaire ? objections principales; corrections concrètes les plus efficaces (copie FR si utile); meilleure et pire ligne; 1-2 verbatims marquants. pageId='${page.id}', pageLabel='${page.label}'.`,
    {label:`synth:${page.id}`, phase:'Per-page synthesis', schema:PAGE_SCHEMA}
  )
)

const pages = results.filter(Boolean)

const overall = await agent(
  `Directeur marketing d'un éditeur de logiciels pour laboratoires de biologie médicale en Algérie (audience: directeurs 30-60, méfiants, sensibles à ISO 15189/GBEA, au contact humain et aux preuves chiffrées). Synthèses par page:
${JSON.stringify(pages, null, 1)}

Produis le bilan: rankedPages (par avgScore), rootCauseStatus pour les 3 causes récurrentes — (1) asymétrie de confiance (on réclame le téléphone sans afficher humain/numéro/identité/preuve), (2) bait-and-switch des CTA, (3) zéro preuve locale nommée avec wilaya — chacune resolved/partial/unresolved + note; crossCuttingWeaknesses; prioritizedFixes (effort low/medium/high + pages); biggestConversionRisk; bottomLine honnête (2-3 phrases).`,
  {label:'overall', phase:'Overall synthesis', schema:OVERALL_SCHEMA}
)

return { pages, overall }
