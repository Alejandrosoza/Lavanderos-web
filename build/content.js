/* All site text, English and French.
   Edit here, then run:  node build/build.js  */

const BIZ = {
  name: "Lavanderos Janitorial",
  phone: "(867) 334-3929",
  phoneHref: "+18673343929",
  email: "admin@lavanderosjanitorial.ca",
  domain: "https://lavanderosjanitorial.ca",
  since: 2001
};

const en = {
  lang: "en",
  path: "/",
  altPath: "/fr/",
  title: "Lavanderos Janitorial | Commercial Cleaning in Whitehorse, Yukon",
  description: "Commercial and janitorial cleaning in Whitehorse, Yukon since 2001. Offices, government buildings, non-profits and post-construction cleaning. Fully insured, bonded and WCB covered.",
  langbarNote: "We speak English, Français & Español",
  langbarNoteShort: "English | Français",
  skip: "Skip to content",
  nav: { services: "Services", industries: "Who we serve", why: "Why us", process: "How it works", contact: "Contact", cta: "Get a free quote" },
  hero: {
    eyebrow: "Whitehorse, Yukon · Since 2001",
    title: "Commercial cleaning you can count on, every single time.",
    sub: "Reliable janitorial services for businesses, government, non-profits and construction companies across Whitehorse and surrounding areas.",
    cta1: "Get a free quote",
    cta2: "Call",
    badges: ["Fully insured", "Bonded", "WCB covered", "25+ years experience", "English · Français · Español"],
    artAlt: "Illustration of commercial buildings in Whitehorse"
  },
  trust: [
    { num: "2001", label: "Serving Whitehorse since" },
    { num: "25+", label: "Years of experience" },
    { num: "100%", label: "Insured, bonded & WCB covered" },
    { num: "1 day", label: "Response to quote requests" }
  ],
  services: {
    eyebrow: "Our services",
    title: "Complete cleaning solutions for your facility",
    lead: "From daily office janitorial to post-construction clean-up, one reliable team for every cleaning need.",
    items: [
      { icon: "office", t: "Office cleaning", d: "Daily, weekly or custom janitorial schedules for offices of any size." },
      { icon: "building", t: "Commercial cleaning", d: "Retail spaces, clinics, warehouses and multi-tenant buildings." },
      { icon: "hammer", t: "Post-construction", d: "Dust, debris and final detail cleaning so your project is ready for handover." },
      { icon: "floor", t: "Floor care", d: "Strip & wax, scrubbing, buffing and long-term floor maintenance." },
      { icon: "carpet", t: "Carpet cleaning", d: "Deep extraction cleaning that removes stains and extends carpet life." },
      { icon: "window", t: "Window cleaning", d: "Interior and exterior glass, frames and sills for a spotless finish." },
      { icon: "shield", t: "Disinfection", d: "High-touch surface disinfection for healthier workplaces." },
      { icon: "box", t: "Move-in / move-out", d: "Complete cleaning for office relocations and vacated spaces." },
      { icon: "home", t: "Residential", d: "Home cleaning services also available on request." }
    ]
  },
  industries: {
    eyebrow: "Who we serve",
    title: "Trusted by organizations across the Yukon",
    items: [
      { icon: "briefcase", t: "Businesses", d: "Offices, retail and professional spaces that need to look their best every morning." },
      { icon: "gov", t: "Government", d: "Public buildings and facilities cleaned to strict standards, with full insurance and WCB coverage." },
      { icon: "heart", t: "Non-profits", d: "Flexible, cost-effective programs for community organizations." },
      { icon: "crane", t: "Construction companies", d: "Rough, final and touch-up cleans that keep your handover on schedule." }
    ]
  },
  why: {
    eyebrow: "Why Lavanderos",
    title: "A cleaning partner you don't have to worry about",
    items: [
      { t: "25+ years in Whitehorse", d: "Local experience since 2001. We know Yukon buildings and Yukon winters." },
      { t: "Fully insured, bonded & WCB covered", d: "Complete protection for your organization, your property and our team." },
      { t: "Flexible schedules", d: "Evenings, weekends and early mornings, so cleaning never disrupts your work." },
      { t: "Consistent quality", d: "Clear checklists and regular inspections keep standards high, visit after visit." },
      { t: "One point of contact, in your language", d: "Talk directly with the owner in English, French or Spanish, with fast answers when you need them." }
    ],
    photoAlt: "Cleaning equipment illustration"
  },
  process: {
    eyebrow: "How it works",
    title: "Getting started is simple",
    steps: [
      { t: "Request a quote", d: "Call us or fill out the form with a few details about your space." },
      { t: "Site walkthrough", d: "We visit your facility to understand your needs and priorities." },
      { t: "Custom proposal", d: "You receive a clear plan with scope, schedule and pricing." },
      { t: "Reliable service", d: "Our team starts on schedule, with regular quality checks." }
    ]
  },
  cta: { title: "Ready for a cleaner workplace?", sub: "Free, no-obligation quotes for businesses and organizations in Whitehorse.", btn1: "Get a free quote", btn2: "Call" },
  contact: {
    eyebrow: "Contact",
    title: "Request a free quote",
    lead: "Tell us about your facility and we will get back to you within 1 business day.",
    phone: "Phone (English · Français · Español)", email: "Email", area: "Service area", areaVal: "Whitehorse & surrounding areas, Yukon",
    hours: "Office hours", hoursVal: "Monday – Friday, 8:00 am – 6:00 pm",
    form: {
      name: "Full name", company: "Company / organization", email: "Email", phone: "Phone",
      service: "Service needed", servicePh: "Select a service",
      frequency: "Frequency", frequencyOpts: ["One-time", "Daily", "Weekly", "Bi-weekly", "Monthly", "Not sure yet"],
      size: "Approx. size (sq ft)", message: "Tell us about your space",
      messagePh: "Type of building, number of floors, special requirements…",
      submit: "Send request",
      note: "We respect your privacy. Your information is only used to respond to your request.",
      required: "required"
    }
  },
  footer: {
    about: "Commercial and janitorial cleaning in Whitehorse, Yukon since 2001. Fully insured, bonded and WCB covered.",
    services: "Services", company: "Company", contact: "Contact",
    rights: "All rights reserved.", langLink: "Version française"
  }
};

const fr = {
  lang: "fr",
  path: "/fr/",
  altPath: "/",
  title: "Lavanderos Janitorial | Nettoyage commercial à Whitehorse, Yukon",
  description: "Services de nettoyage commercial et d’entretien ménager à Whitehorse, Yukon, depuis 2001. Bureaux, édifices gouvernementaux, organismes sans but lucratif et nettoyage après construction. Entièrement assurés, cautionnés et couverts par la CSST du Yukon.",
  langbarNote: "Service en français, en anglais et en espagnol",
  langbarNoteShort: "Français | English",
  skip: "Aller au contenu",
  nav: { services: "Services", industries: "Clientèle", why: "Pourquoi nous", process: "Fonctionnement", contact: "Contact", cta: "Soumission gratuite" },
  hero: {
    eyebrow: "Whitehorse, Yukon · Depuis 2001",
    title: "Un nettoyage commercial fiable, à chaque visite.",
    sub: "Services d’entretien ménager fiables pour les entreprises, le gouvernement, les organismes sans but lucratif et les entreprises de construction à Whitehorse et dans les environs.",
    cta1: "Soumission gratuite",
    cta2: "Appelez",
    badges: ["Entièrement assurés", "Cautionnés", "Couverts par la CSST", "Plus de 25 ans d’expérience", "Français · English · Español"],
    artAlt: "Illustration d’édifices commerciaux à Whitehorse"
  },
  trust: [
    { num: "2001", label: "Au service de Whitehorse depuis" },
    { num: "25+", label: "Années d’expérience" },
    { num: "100 %", label: "Assurés, cautionnés et couverts par la CSST" },
    { num: "1 jour", label: "Délai de réponse aux soumissions" }
  ],
  services: {
    eyebrow: "Nos services",
    title: "Des solutions de nettoyage complètes pour vos locaux",
    lead: "De l’entretien quotidien des bureaux au nettoyage après construction : une seule équipe fiable pour tous vos besoins.",
    items: [
      { icon: "office", t: "Entretien de bureaux", d: "Horaires quotidiens, hebdomadaires ou personnalisés pour bureaux de toutes tailles." },
      { icon: "building", t: "Nettoyage commercial", d: "Commerces, cliniques, entrepôts et immeubles à locataires multiples." },
      { icon: "hammer", t: "Après construction", d: "Poussière, débris et nettoyage de finition pour une livraison de projet impeccable." },
      { icon: "floor", t: "Entretien des planchers", d: "Décapage et cirage, récurage, polissage et entretien à long terme." },
      { icon: "carpet", t: "Nettoyage de tapis", d: "Nettoyage en profondeur par extraction qui élimine les taches et prolonge la durée de vie." },
      { icon: "window", t: "Lavage de vitres", d: "Vitres intérieures et extérieures, cadres et rebords pour un fini impeccable." },
      { icon: "shield", t: "Désinfection", d: "Désinfection des surfaces fréquemment touchées pour un milieu de travail plus sain." },
      { icon: "box", t: "Emménagement / déménagement", d: "Nettoyage complet lors de relocalisations de bureaux et de locaux libérés." },
      { icon: "home", t: "Résidentiel", d: "Nettoyage résidentiel également offert sur demande." }
    ]
  },
  industries: {
    eyebrow: "Clientèle",
    title: "La confiance d’organisations partout au Yukon",
    items: [
      { icon: "briefcase", t: "Entreprises", d: "Bureaux, commerces et espaces professionnels impeccables chaque matin." },
      { icon: "gov", t: "Gouvernement", d: "Édifices et installations publics nettoyés selon des normes strictes, avec assurance complète et couverture de la CSST." },
      { icon: "heart", t: "Organismes sans but lucratif", d: "Programmes flexibles et économiques pour les organismes communautaires." },
      { icon: "crane", t: "Entreprises de construction", d: "Nettoyages grossiers, finaux et de retouche pour respecter vos échéanciers de livraison." }
    ]
  },
  why: {
    eyebrow: "Pourquoi Lavanderos",
    title: "Un partenaire d’entretien dont vous n’avez pas à vous soucier",
    items: [
      { t: "Plus de 25 ans à Whitehorse", d: "Une expérience locale depuis 2001. Nous connaissons les édifices et les hivers du Yukon." },
      { t: "Assurés, cautionnés et couverts par la CSST", d: "Une protection complète pour votre organisation, vos biens et notre équipe." },
      { t: "Horaires flexibles", d: "Soirs, fins de semaine et tôt le matin, sans perturber votre travail." },
      { t: "Qualité constante", d: "Des listes de vérification claires et des inspections régulières, visite après visite." },
      { t: "Un seul interlocuteur, dans votre langue", d: "Parlez directement avec le propriétaire en français, en anglais ou en espagnol, et obtenez des réponses rapides." }
    ],
    photoAlt: "Illustration d’équipement de nettoyage"
  },
  process: {
    eyebrow: "Fonctionnement",
    title: "Commencer est simple",
    steps: [
      { t: "Demandez une soumission", d: "Appelez-nous ou remplissez le formulaire avec quelques détails sur vos locaux." },
      { t: "Visite des lieux", d: "Nous visitons vos installations pour comprendre vos besoins et priorités." },
      { t: "Proposition sur mesure", d: "Vous recevez un plan clair : portée, horaire et prix." },
      { t: "Service fiable", d: "Notre équipe commence selon l’horaire prévu, avec des contrôles de qualité réguliers." }
    ]
  },
  cta: { title: "Prêt pour un milieu de travail plus propre?", sub: "Soumissions gratuites et sans engagement pour les entreprises et organisations de Whitehorse.", btn1: "Soumission gratuite", btn2: "Appelez" },
  contact: {
    eyebrow: "Contact",
    title: "Demandez une soumission gratuite",
    lead: "Parlez-nous de vos locaux et nous vous répondrons d’ici 1 jour ouvrable.",
    phone: "Téléphone (français · anglais · espagnol)", email: "Courriel", area: "Zone desservie", areaVal: "Whitehorse et les environs, Yukon",
    hours: "Heures d’ouverture", hoursVal: "Lundi au vendredi, de 8 h à 18 h",
    form: {
      name: "Nom complet", company: "Entreprise / organisation", email: "Courriel", phone: "Téléphone",
      service: "Service requis", servicePh: "Choisissez un service",
      frequency: "Fréquence", frequencyOpts: ["Une seule fois", "Quotidienne", "Hebdomadaire", "Aux deux semaines", "Mensuelle", "Je ne sais pas encore"],
      size: "Superficie approx. (pi²)", message: "Parlez-nous de vos locaux",
      messagePh: "Type d’édifice, nombre d’étages, exigences particulières…",
      submit: "Envoyer la demande",
      note: "Nous respectons votre vie privée. Vos renseignements servent uniquement à répondre à votre demande.",
      required: "obligatoire"
    }
  },
  footer: {
    about: "Nettoyage commercial et entretien ménager à Whitehorse, Yukon, depuis 2001. Entièrement assurés, cautionnés et couverts par la CSST du Yukon.",
    services: "Services", company: "Entreprise", contact: "Contact",
    rights: "Tous droits réservés.", langLink: "English version"
  }
};

module.exports = { BIZ, en, fr };
