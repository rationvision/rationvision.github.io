(function () {
  const header = document.getElementById("siteHeader");
  const btn = document.getElementById("menuBtn");
  const productMenus = Array.from(document.querySelectorAll("[data-product-menu]"));

  function setOpen(open) {
    header.dataset.open = open ? "true" : "false";
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    if (!open) closeProductMenus();
  }

  function setProductOpen(menu, open) {
    menu.dataset.open = open ? "true" : "false";
    const toggle = menu.querySelector("[data-product-toggle]");
    if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function closeProductMenus(exceptMenu) {
    productMenus.forEach((menu) => {
      if (menu !== exceptMenu) setProductOpen(menu, false);
    });
  }

  btn?.addEventListener("click", () => {
    const open = header.dataset.open === "true";
    setOpen(!open);
  });

  productMenus.forEach((menu) => {
    const toggle = menu.querySelector("[data-product-toggle]");
    if (!toggle) return;

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = menu.dataset.open === "true";
      closeProductMenus(menu);
      setProductOpen(menu, !open);
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeProductMenus();
      }, { passive: true });
    });
  });

  document.addEventListener("click", (e) => {
    if (header.dataset.open !== "true") return;
    if (!header.contains(e.target)) setOpen(false);
  });

  document.addEventListener("click", (e) => {
    if (productMenus.some((menu) => menu.contains(e.target))) return;
    closeProductMenus();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    setOpen(false);
    closeProductMenus();
  });

  document.querySelectorAll(".mobile-nav a[href^='#']").forEach((a) => {
    a.addEventListener("click", () => setOpen(false), { passive: true });
  });

  function onScroll() {
    header.dataset.scrolled = window.scrollY > 8 ? "true" : "false";
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const navAnchors = Array.from(document.querySelectorAll("[data-navlink][href^='#']"));
  const groups = new Map();
  for (const a of navAnchors) {
    const id = (a.getAttribute("href") || "").slice(1);
    if (!id) continue;
    if (!groups.has(id)) groups.set(id, []);
    groups.get(id).push(a);
  }

  const setActive = (id) => {
    navAnchors.forEach((a) => a.removeAttribute("aria-current"));
    (groups.get(id) || []).forEach((a) => a.setAttribute("aria-current", "page"));
  };

  const sections = Array.from(groups.keys()).map((id) => document.getElementById(id)).filter(Boolean);

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
        break;
      }
    }
  }, { rootMargin: "-20% 0px -65% 0px", threshold: 0.01 });

  sections.forEach((sec) => io.observe(sec));

  document.getElementById("year").textContent = new Date().getFullYear();
})();

(function () {
  const config = window.RATION_CONFIG || {};
  if (!config.hideRationfeedSpecSheet) return;

  const specLine = document.querySelector(".spec-line");
  if (specLine) specLine.style.display = "none";
})();

(function () {
  const translations = {
    en: {},
    no: {},
    es: {}
  };

  Object.assign(translations.en, {
    title: "RationCOUNTER: Reliable fish counts with welfare-first design",
    description: "RationCOUNTER delivers dependable fish counting and biomass relevant reporting during transfers and grading, with fish welfare built into the design.",
    "nav.home": "Home",
    "nav.overview": "Overview",
    "nav.how": "How it works",
    "nav.features": "Features",
    "nav.welfare": "Welfare",
    "nav.support": "Support",
    "nav.contact": "Contact",
    "cta.products": "View Products",
    "cta.service": "Service & Support",
    "cta.news": "News",
    "cta.demo": "Contact Us",
    "product.menu.feed": "RationFeed",
    "product.menu.counter": "RationCounter",
    "hero.pill": "RationCOUNTER for land-based aquaculture",
    "hero.title": "<span class=\"hero-title-line\">Reliable fish counts</span><span class=\"hero-title-line\">with welfare-first design</span>",
    "hero.details.title": "Reliable fish counts with welfare-first design",
    "hero.body": "<span class=\"hero-subhead-line\"><span class=\"hero-product\">RationCOUNTER</span> is built for accurate fish counting</span><span class=\"hero-subhead-line\">and biomass relevant reporting during transfers and grading.</span>",
    "hero.details.body": "RationCOUNTER is built for accurate fish counting and biomass-relevant reporting during transfers and grading, while supporting smooth handling and good fish welfare.",
    "hero.cta.demo": "Request a demo",
    "hero.cta.learn": "Learn more",
    "hero.cta.how": "See how it works",
    "hero.bullet.one": "Advanced computer vision focused on precision and operational stability.",
    "hero.bullet.two": "Individual tracking instead of snapshots for reliable counts in fast flow.",
    "hero.bullet.three": "Designed for smooth handling with short time out of water and controlled passage geometry.",
    "hero.caption": "Dry Fish Counter for precise counting during transfers and grading",
    "challenge.kicker": "The challenge",
    "challenge.title": "When the real fish number is uncertain, decisions get weaker",
    "challenge.lead": "Accurate counts are the foundation for feeding, density control, transfer planning, and biomass reporting in land-based aquaculture.",
    "challenge.card1.title": "Transfers create the best counting opportunity",
    "challenge.card1.body": "Transfers and grading create a moment when each fish can be observed, but fish still move fast and in dense flow. That makes dependable counting one of the hardest computer vision tasks in aquaculture.",
    "challenge.card2.title": "The count must be practical and trustworthy",
    "challenge.card2.body": "If operators cannot trust the number, feeding, density management, and reporting all get weaker. Stable counting needs good imaging, controlled passage, and robust tracking without double counts or missed fish.",
    "challenge.metric1.value": "60 fps",
    "challenge.metric1.label": "Real-time analysis",
    "challenge.metric2.value": "400-600",
    "challenge.metric2.label": "Fish per minute prototype throughput",
    "challenge.metric3.value": "&lt;1%",
    "challenge.metric3.label": "Target counting error",
    "solution.kicker": "Solution",
    "solution.title": "Dry fish counting with precise tracking and biomass-relevant reporting",
    "solution.lead": "RationCOUNTER is designed for transfers and grading, where fish pass through a controlled dry channel and are analyzed individually in real time.",
    "solution.card1.title": "Track each fish to avoid double counts",
    "solution.card1.body": "The system tracks individuals between frames instead of relying on simple frame-by-frame snapshots. That improves robustness when flow is fast and fish spacing changes.",
    "solution.card2.title": "Biomass and size distribution",
    "solution.card2.body": "Session summaries include total count, throughput, and size-distribution information that supports biomass estimates, planning, and consistent reporting.",
    "solution.card3.title": "Built for real farm operations",
    "solution.card3.body": "The mechanical design, imaging zone, and operator workflow are built around smooth handling, verification, and dependable daily use rather than lab-only conditions.",
    "solution.media.title": "Interface view placeholder for live sessions and exported reports",
    "solution.media.body": "This placeholder represents the operator interface area for live counts, throughput, size distribution, and reporting outputs. Replace it with a production screenshot when one is available.",
    "solution.media.caption": "Placeholder image for the future RationCOUNTER user interface",
    "how.kicker": "How it works",
    "how.title": "From installation to verified results",
    "how.lead": "A straightforward deployment process designed to fit existing handling lines for transfers and grading.",
    "how.step1.title": "Install on the handling line",
    "how.step1.body": "Mount the counter where fish are transferred or graded. The dry passage geometry is designed to support smooth, consistent movement through the counting zone.",
    "how.step1.spec": "<strong>Spec sheet:</strong> <a href=\"spec-sheet.pdf\" target=\"_blank\" rel=\"noopener\">Download detailed specifications</a> <span class=\"small\">(add your PDF next to this HTML file)</span>",
    "how.step2.title": "Count and measure in real time",
    "how.step2.body": "Fish are imaged at high frame rate and analyzed as they pass the counting zone. Individual tracking supports stable counts even when flow conditions are demanding.",
    "how.step3.title": "Review, export, and report",
    "how.step3.body": "Operators can review live sessions and export summaries with count, throughput, and size-distribution metrics for reporting and production planning.",
    "features.kicker": "Features",
    "features.title": "Purpose-built for accurate, dependable fish counts",
    "features.lead": "RationCOUNTER combines controlled fish passage, advanced vision, and operator-friendly reporting to make counts more stable and verifiable.",
    "features.card1.title": "High-precision counting",
    "features.card1.body": "Designed for verifiable counts with a target accuracy under 1% in typical operating conditions.",
    "features.card2.title": "Individual tracking",
    "features.card2.body": "Tracks fish between frames to reduce double counts and missed individuals in high-throughput flow.",
    "features.card3.title": "Biomass reporting",
    "features.card3.body": "Session summaries include size-distribution and biomass-relevant metrics for planning and reporting.",
    "features.card4.title": "Out-of-water imaging",
    "features.card4.body": "Controlled dry passage improves visibility and consistency for more robust computer vision analysis.",
    "features.card5.title": "Operator-friendly workflow",
    "features.card5.body": "Live session status, clear outputs, and exportable results keep the system practical for daily use.",
    "features.card6.title": "Built for operations",
    "features.card6.body": "Stable mechanical design, smooth flow, and support for uptime-focused deployment at real sites.",
    "welfare.kicker": "Fish welfare",
    "welfare.title": "Fish welfare by design",
    "welfare.lead": "Fish welfare is a core design consideration in RationCOUNTER, from passage geometry to operational stability.",
    "welfare.card1.title": "Smooth, continuous handling",
    "welfare.card1.body": "The counter is designed to support smooth flow with minimal obstruction, short handling time, and controlled geometry through the counting zone.",
    "welfare.card2.title": "Consistent conditions for operators and fish",
    "welfare.card2.body": "Stable operation without sudden starts and stops supports dependable counting while helping teams handle fish more consistently during transfers and grading.",
    "welfare.cta": "Talk to us",
    "welfare.media.title": "Controlled dry passage outside water",
    "welfare.media.body": "Fish pass individually through a controlled channel outside of water, where each fish can be observed and analyzed in real time with high precision and practical handling conditions.",
    "welfare.media.caption": "Designed for smooth passage and precise counting",
    "support.kicker": "Support",
    "support.title": "Service and support built around uptime",
    "support.lead": "We aim to make deployment straightforward and operation stable, with software improvements and assistance over time.",
    "support.card1.title": "Commissioning",
    "support.card1.body": "Installation guidance and configuration to match your handling line geometry and operating conditions.",
    "support.card2.title": "Remote support",
    "support.card2.body": "Fast troubleshooting and assistance with clear logs, session data, and responsive follow-up.",
    "support.card3.title": "Continuous improvement",
    "support.card3.body": "Ongoing software improvements focused on accuracy, stability, and operator experience.",
    "contact.title": "Contact for information or a demo",
    "contact.lead": "Email <strong>sales@ration.is</strong> to discuss your setup, get a proposal, or schedule a demo.",
    "contact.cta": "Email sales@ration.is",
    "footer.about.title": "About Ration",
    "footer.about.body": "To improve modern aquaculture outcomes by combining deep industry knowledge, robust technology, and close collaboration with producers, strengthening fish welfare, reducing waste, and supporting sustainable growth.",
    "footer.about.cta": "Let's build better aquaculture together.",
    "footer.partnerships.title": "Collaboration &amp; Partnerships",
    "footer.copyright": "&copy; <span id=&quot;year&quot;></span> Ration. All rights reserved."
  });

  Object.assign(translations.no, {
    title: "RationCOUNTER: P&aring;litelig fisketelling med fiskevelferd i sentrum",
    description: "RationCOUNTER leverer p&aring;litelig fisketelling og biomasserelevante rapporter under overf&oslash;ringer og sortering, med fiskevelferd bygget inn i designet.",
    "nav.home": "Hjem",
    "nav.overview": "Oversikt",
    "nav.how": "Slik fungerer det",
    "nav.features": "Funksjoner",
    "nav.welfare": "Fiskevelferd",
    "nav.support": "Support",
    "nav.contact": "Kontakt",
    "cta.products": "Se produkter",
    "cta.service": "Service og support",
    "cta.news": "Nyheter",
    "cta.demo": "Kontakt oss",
    "product.menu.feed": "RationFeed",
    "product.menu.counter": "RationCounter",
    "hero.pill": "RationCOUNTER for landbasert akvakultur",
    "hero.title": "<span class=\"hero-title-line\">P&aring;litelig fisketelling</span><span class=\"hero-title-line\">med fiskevelferd i sentrum</span>",
    "hero.details.title": "P&aring;litelig fisketelling med fiskevelferd i sentrum",
    "hero.body": "<span class=\"hero-subhead-line\"><span class=\"hero-product\">RationCOUNTER</span> er utviklet for n&oslash;yaktig fisketelling</span><span class=\"hero-subhead-line\">og biomasserelevante rapporter under overf&oslash;ringer og sortering.</span>",
    "hero.details.body": "RationCOUNTER er utviklet for n&oslash;yaktig fisketelling og biomasse-relevante rapporter under overf&oslash;ringer og sortering, samtidig som den st&oslash;tter sk&aring;nsom h&aring;ndtering og god fiskevelferd.",
    "hero.cta.demo": "Be om en demo",
    "hero.cta.learn": "Les mer",
    "hero.cta.how": "Se hvordan det fungerer",
    "hero.bullet.one": "Avansert datavisjon med fokus p&aring; presisjon og operasjonell stabilitet.",
    "hero.bullet.two": "Individsporing i stedet for stillbilder for p&aring;litelig telling ved h&oslash;y hastighet.",
    "hero.bullet.three": "Utformet for sk&aring;nsom h&aring;ndtering med kort tid utenfor vann og kontrollert passasjegeometri.",
    "hero.caption": "T&oslash;rrfiskteller for presis telling under overf&oslash;ringer og sortering",
    "challenge.kicker": "Utfordringen",
    "challenge.title": "N&aring;r det reelle fisketallet er usikkert, blir beslutningene svakere",
    "challenge.lead": "N&oslash;yaktige tellinger er grunnlaget for f&ocirc;ring, tetthetskontroll, planlegging av overf&oslash;ringer og biomasserapportering i landbasert akvakultur.",
    "challenge.card1.title": "Overf&oslash;ringer gir den beste muligheten for telling",
    "challenge.card1.body": "Overf&oslash;ringer og sortering skaper et tidspunkt hvor hver fisk kan observeres, men fisken beveger seg fortsatt raskt og i tett str&oslash;m. Det gj&oslash;r p&aring;litelig telling til en av de vanskeligste datavisjonsoppgavene i akvakultur.",
    "challenge.card2.title": "Tellingen m&aring; v&aelig;re praktisk og troverdig",
    "challenge.card2.body": "Hvis operat&oslash;rene ikke kan stole p&aring; tallet, blir f&ocirc;ring, tetthetsstyring og rapportering svakere. Stabil telling krever god avbildning, kontrollert passasje og robust sporing uten dobbelttelling eller tapte fisk.",
    "challenge.metric1.value": "60 fps",
    "challenge.metric1.label": "Sanntidsanalyse",
    "challenge.metric2.value": "400-600",
    "challenge.metric2.label": "Fisk per minutt i prototype",
    "challenge.metric3.value": "&lt;1%",
    "challenge.metric3.label": "M&aring;l for tellefeil",
    "solution.kicker": "L&oslash;sning",
    "solution.title": "T&oslash;rrtelling av fisk med presis sporing og biomasse-relevante rapporter",
    "solution.lead": "RationCOUNTER er utviklet for overf&oslash;ringer og sortering, der fisken passerer gjennom en kontrollert t&oslash;rr kanal og analyseres individuelt i sanntid.",
    "solution.card1.title": "Spor hver fisk for &aring; unng&aring; dobbelttelling",
    "solution.card1.body": "Systemet sporer individer mellom bildene i stedet for &aring; basere seg p&aring; enkle stillbilder bilde for bilde. Det gir bedre robusthet n&aring;r str&oslash;mmen er rask og avstanden mellom fisk varierer.",
    "solution.card2.title": "Biomasse og st&oslash;rrelsesfordeling",
    "solution.card2.body": "Sesjonsoppsummeringer inkluderer totalt antall, kapasitet og informasjon om st&oslash;rrelsesfordeling som st&oslash;tter biomasseestimering, planlegging og konsistent rapportering.",
    "solution.card3.title": "Bygget for reell drift",
    "solution.card3.body": "Mekanisk design, bildesone og operat&oslash;rworkflow er laget for sk&aring;nsom h&aring;ndtering, verifisering og p&aring;litelig daglig bruk, ikke bare laboratorieforhold.",
    "solution.media.title": "Plassholder for grensesnitt med live-sesjoner og eksporterte rapporter",
    "solution.media.body": "Denne plassholderen representerer operat&oslash;rgrensesnittet for live telling, kapasitet, st&oslash;rrelsesfordeling og rapportering. Bytt den ut med et faktisk skjermbilde n&aring;r det er tilgjengelig.",
    "solution.media.caption": "Plassholderbilde for fremtidig RationCOUNTER-grensesnitt",
    "how.kicker": "Slik fungerer det",
    "how.title": "Fra installasjon til verifiserte resultater",
    "how.lead": "En enkel utrullingsprosess som er laget for &aring; passe eksisterende h&aring;ndteringslinjer for overf&oslash;ringer og sortering.",
    "how.step1.title": "Installer p&aring; h&aring;ndteringslinjen",
    "how.step1.body": "Monter telleren der fisken overf&oslash;res eller sorteres. Den t&oslash;rre passasjegeometrien er laget for jevn og konsistent bevegelse gjennom tellesonen.",
    "how.step1.spec": "<strong>Spesifikasjon:</strong> <a href=\"spec-sheet.pdf\" target=\"_blank\" rel=\"noopener\">Last ned detaljerte spesifikasjoner</a> <span class=\"small\">(legg PDF-en ved siden av denne HTML-filen)</span>",
    "how.step2.title": "Tell og m&aring;l i sanntid",
    "how.step2.body": "Fisken avbildes med h&oslash;y bildefrekvens og analyseres mens den passerer tellesonen. Individsporing gir stabil telling selv under krevende str&oslash;mningsforhold.",
    "how.step3.title": "Se gjennom, eksporter og rapporter",
    "how.step3.body": "Operat&oslash;rene kan gjennomg&aring; live-sesjoner og eksportere oppsummeringer med telling, kapasitet og st&oslash;rrelsesfordelingsdata til rapportering og produksjonsplanlegging.",
    "features.kicker": "Funksjoner",
    "features.title": "Bygget for n&oslash;yaktig og p&aring;litelig fisketelling",
    "features.lead": "RationCOUNTER kombinerer kontrollert fiskepassasje, avansert datavisjon og operat&oslash;rvennlig rapportering for mer stabil og verifiserbar telling.",
    "features.card1.title": "H&oslash;ypresisjonstelling",
    "features.card1.body": "Utformet for verifiserbare tellinger med et m&aring;l om under 1 % feil i typiske driftsforhold.",
    "features.card2.title": "Individsporing",
    "features.card2.body": "Sporer fisk mellom bildene for &aring; redusere dobbelttelling og tapte individer i h&oslash;y gjennomstr&oslash;mning.",
    "features.card3.title": "Biomasserapportering",
    "features.card3.body": "Sesjonsoppsummeringer inkluderer st&oslash;rrelsesfordeling og biomasse-relevante data for planlegging og rapportering.",
    "features.card4.title": "Avbildning utenfor vann",
    "features.card4.body": "Kontrollert t&oslash;rr passasje gir bedre sikt og konsistens for mer robust datavisjonsanalyse.",
    "features.card5.title": "Operat&oslash;rvennlig arbeidsflyt",
    "features.card5.body": "Live status, tydelige resultater og eksporterbare data gj&oslash;r systemet praktisk i daglig drift.",
    "features.card6.title": "Bygget for drift",
    "features.card6.body": "Stabil mekanisk design, jevn flyt og st&oslash;tte for utrulling med fokus p&aring; oppetid p&aring; reelle anlegg.",
    "welfare.kicker": "Fiskevelferd",
    "welfare.title": "Fiskevelferd i designet",
    "welfare.lead": "Fiskevelferd er en kjernefaktor i utformingen av RationCOUNTER, fra passasjegeometri til operasjonell stabilitet.",
    "welfare.card1.title": "Jevn og kontinuerlig h&aring;ndtering",
    "welfare.card1.body": "Telleren er utformet for jevn flyt med minimal hindring, kort h&aring;ndteringstid og kontrollert geometri gjennom tellesonen.",
    "welfare.card2.title": "Konsistente forhold for operat&oslash;rer og fisk",
    "welfare.card2.body": "Stabil drift uten plutselige starter og stopp st&oslash;tter p&aring;litelig telling og hjelper team med mer konsekvent h&aring;ndtering under overf&oslash;ringer og sortering.",
    "welfare.cta": "Snakk med oss",
    "welfare.media.title": "Kontrollert t&oslash;rr passasje utenfor vann",
    "welfare.media.body": "Fisken passerer individuelt gjennom en kontrollert kanal utenfor vann, der hver fisk kan observeres og analyseres i sanntid med h&oslash;y presisjon og praktiske h&aring;ndteringsforhold.",
    "welfare.media.caption": "Utformet for jevn passasje og presis telling",
    "support.kicker": "Support",
    "support.title": "Service og support bygget rundt oppetid",
    "support.lead": "Vi vil gj&oslash;re utrulling enkel og driften stabil, med programvareforbedringer og bistand over tid.",
    "support.card1.title": "Idriftsetting",
    "support.card1.body": "Installasjonsveiledning og konfigurering tilpasset geometri og driftsforhold i h&aring;ndteringslinjen.",
    "support.card2.title": "Fjernsupport",
    "support.card2.body": "Rask feils&oslash;king og bistand med tydelige logger, sesjonsdata og tett oppf&oslash;lging.",
    "support.card3.title": "Kontinuerlig forbedring",
    "support.card3.body": "L&oslash;pende programvareforbedringer med fokus p&aring; n&oslash;yaktighet, stabilitet og operat&oslash;ropplevelse.",
    "contact.title": "Kontakt for informasjon eller demo",
    "contact.lead": "Send e-post til <strong>sales@ration.is</strong> for &aring; diskutere oppsettet ditt, f&aring; et forslag eller avtale en demo.",
    "contact.cta": "Send e-post til sales@ration.is",
    "footer.about.title": "Om Ration",
    "footer.about.body": "Forbedre resultatene i moderne akvakultur ved &aring; kombinere dyp bransjekunnskap, robust teknologi og n&aelig;rt samarbeid med produsenter, som styrker fiskevelferd, reduserer svinn og st&oslash;tter b&aelig;rekraftig vekst.",
    "footer.about.cta": "La oss bygge bedre akvakultur sammen.",
    "footer.partnerships.title": "Samarbeid og partnerskap",
    "footer.copyright": "&copy; <span id=&quot;year&quot;></span> Ration. Alle rettigheter reservert."
  });

  Object.assign(translations.es, {
    title: "RationCOUNTER: Conteos fiables con dise&ntilde;o centrado en el bienestar",
    description: "RationCOUNTER ofrece conteos fiables de peces e informes relevantes para biomasa durante traslados y clasificaci&oacute;n, con el bienestar de los peces integrado en el dise&ntilde;o.",
    "nav.home": "Inicio",
    "nav.overview": "Visi&oacute;n general",
    "nav.how": "C&oacute;mo funciona",
    "nav.features": "Funciones",
    "nav.welfare": "Bienestar",
    "nav.support": "Soporte",
    "nav.contact": "Contacto",
    "cta.products": "Ver productos",
    "cta.service": "Servicio y soporte",
    "cta.news": "Noticias",
    "cta.demo": "Contáctenos",
    "product.menu.feed": "RationFeed",
    "product.menu.counter": "RationCounter",
    "hero.pill": "RationCOUNTER para acuicultura en tierra",
    "hero.title": "<span class=\"hero-title-line\">Conteos fiables de peces</span><span class=\"hero-title-line\">con dise&ntilde;o centrado en el bienestar</span>",
    "hero.details.title": "Conteos fiables con dise&ntilde;o centrado en el bienestar",
    "hero.body": "<span class=\"hero-subhead-line\"><span class=\"hero-product\">RationCOUNTER</span> est&aacute; dise&ntilde;ado para conteos precisos</span><span class=\"hero-subhead-line\">e informes relevantes para biomasa durante traslados y clasificaci&oacute;n.</span>",
    "hero.details.body": "RationCOUNTER est&aacute; dise&ntilde;ado para conteos precisos de peces e informes relevantes para biomasa durante traslados y clasificaci&oacute;n, a la vez que favorece una manipulaci&oacute;n suave y un buen bienestar de los peces.",
    "hero.cta.demo": "Solicitar una demo",
    "hero.cta.learn": "M&aacute;s informaci&oacute;n",
    "hero.cta.how": "Ver c&oacute;mo funciona",
    "hero.bullet.one": "Visi&oacute;n por computador avanzada centrada en la precisi&oacute;n y la estabilidad operativa.",
    "hero.bullet.two": "Seguimiento individual en lugar de instant&aacute;neas para conteos fiables en flujos r&aacute;pidos.",
    "hero.bullet.three": "Dise&ntilde;ado para una manipulaci&oacute;n suave con poco tiempo fuera del agua y una geometr&iacute;a de paso controlada.",
    "hero.caption": "Contador seco de peces para conteos precisos durante traslados y clasificaci&oacute;n",
    "challenge.kicker": "El reto",
    "challenge.title": "Cuando el n&uacute;mero real de peces es incierto, las decisiones se debilitan",
    "challenge.lead": "Los conteos precisos son la base para la alimentaci&oacute;n, el control de densidad, la planificaci&oacute;n de traslados y los informes de biomasa en la acuicultura terrestre.",
    "challenge.card1.title": "Los traslados crean la mejor oportunidad para contar",
    "challenge.card1.body": "Los traslados y la clasificaci&oacute;n crean un momento en el que cada pez puede observarse, pero los peces siguen movi&eacute;ndose r&aacute;pido y en flujos densos. Eso convierte el conteo fiable en una de las tareas de visi&oacute;n por computador m&aacute;s dif&iacute;ciles de la acuicultura.",
    "challenge.card2.title": "El conteo debe ser pr&aacute;ctico y confiable",
    "challenge.card2.body": "Si los operadores no pueden confiar en el dato, la alimentaci&oacute;n, la gesti&oacute;n de densidad y los informes se debilitan. Un conteo estable requiere buena imagen, paso controlado y seguimiento robusto sin dobles conteos ni peces omitidos.",
    "challenge.metric1.value": "60 fps",
    "challenge.metric1.label": "An&aacute;lisis en tiempo real",
    "challenge.metric2.value": "400-600",
    "challenge.metric2.label": "Peces por minuto en el prototipo",
    "challenge.metric3.value": "&lt;1%",
    "challenge.metric3.label": "Objetivo de error de conteo",
    "solution.kicker": "Soluci&oacute;n",
    "solution.title": "Conteo seco de peces con seguimiento preciso e informes relevantes para biomasa",
    "solution.lead": "RationCOUNTER est&aacute; dise&ntilde;ado para traslados y clasificaci&oacute;n, donde los peces pasan por un canal seco controlado y se analizan individualmente en tiempo real.",
    "solution.card1.title": "Sigue cada pez para evitar dobles conteos",
    "solution.card1.body": "El sistema sigue individuos entre fotogramas en lugar de depender de simples instant&aacute;neas cuadro por cuadro. Esto mejora la robustez cuando el flujo es r&aacute;pido y la separaci&oacute;n entre peces cambia.",
    "solution.card2.title": "Biomasa y distribuci&oacute;n de tallas",
    "solution.card2.body": "Los res&uacute;menes de sesi&oacute;n incluyen conteo total, capacidad e informaci&oacute;n de distribuci&oacute;n de tallas que apoyan la estimaci&oacute;n de biomasa, la planificaci&oacute;n y los informes consistentes.",
    "solution.card3.title": "Construido para operaciones reales",
    "solution.card3.body": "El dise&ntilde;o mec&aacute;nico, la zona de imagen y el flujo de trabajo del operador est&aacute;n pensados para la manipulaci&oacute;n suave, la verificaci&oacute;n y el uso diario fiable, no solo para condiciones de laboratorio.",
    "solution.media.title": "Marcador de posici&oacute;n para la interfaz con sesiones en vivo e informes exportados",
    "solution.media.body": "Este marcador representa el &aacute;rea de interfaz del operador para conteos en vivo, capacidad, distribuci&oacute;n de tallas y salidas de reportes. Sustit&uacute;yelo por una captura real cuando est&eacute; disponible.",
    "solution.media.caption": "Imagen de marcador para la futura interfaz de RationCOUNTER",
    "how.kicker": "C&oacute;mo funciona",
    "how.title": "Desde la instalaci&oacute;n hasta los resultados verificados",
    "how.lead": "Un proceso de despliegue sencillo dise&ntilde;ado para adaptarse a l&iacute;neas de manipulaci&oacute;n existentes en traslados y clasificaci&oacute;n.",
    "how.step1.title": "Instala en la l&iacute;nea de manipulaci&oacute;n",
    "how.step1.body": "Monta el contador donde se trasladan o clasifican los peces. La geometr&iacute;a del paso seco est&aacute; dise&ntilde;ada para apoyar un movimiento suave y consistente a trav&eacute;s de la zona de conteo.",
    "how.step1.spec": "<strong>Ficha t&eacute;cnica:</strong> <a href=\"spec-sheet.pdf\" target=\"_blank\" rel=\"noopener\">Descargar especificaciones detalladas</a> <span class=\"small\">(agrega tu PDF junto a este archivo HTML)</span>",
    "how.step2.title": "Cuenta y mide en tiempo real",
    "how.step2.body": "Los peces se capturan a alta velocidad de fotogramas y se analizan al pasar por la zona de conteo. El seguimiento individual favorece conteos estables incluso cuando las condiciones del flujo son exigentes.",
    "how.step3.title": "Revisa, exporta e informa",
    "how.step3.body": "Los operadores pueden revisar sesiones en vivo y exportar res&uacute;menes con conteo, capacidad y m&eacute;tricas de distribuci&oacute;n de tallas para informes y planificaci&oacute;n productiva.",
    "features.kicker": "Funciones",
    "features.title": "Dise&ntilde;ado para conteos precisos y fiables",
    "features.lead": "RationCOUNTER combina paso controlado de peces, visi&oacute;n avanzada y reportes amigables para el operador para lograr conteos m&aacute;s estables y verificables.",
    "features.card1.title": "Conteo de alta precisi&oacute;n",
    "features.card1.body": "Dise&ntilde;ado para ofrecer conteos verificables con un objetivo de error inferior al 1 % en condiciones operativas t&iacute;picas.",
    "features.card2.title": "Seguimiento individual",
    "features.card2.body": "Sigue peces entre fotogramas para reducir dobles conteos y peces omitidos en flujos de alto rendimiento.",
    "features.card3.title": "Informes de biomasa",
    "features.card3.body": "Los res&uacute;menes de sesi&oacute;n incluyen distribuci&oacute;n de tallas y m&eacute;tricas relevantes para biomasa para planificaci&oacute;n e informes.",
    "features.card4.title": "Imagen fuera del agua",
    "features.card4.body": "El paso seco controlado mejora la visibilidad y la consistencia para un an&aacute;lisis de visi&oacute;n por computador m&aacute;s robusto.",
    "features.card5.title": "Flujo de trabajo amigable",
    "features.card5.body": "Estado en vivo, salidas claras y resultados exportables mantienen el sistema pr&aacute;ctico para el uso diario.",
    "features.card6.title": "Hecho para operaciones",
    "features.card6.body": "Dise&ntilde;o mec&aacute;nico estable, flujo suave y soporte para despliegues centrados en el tiempo de actividad en sitios reales.",
    "welfare.kicker": "Bienestar de los peces",
    "welfare.title": "Bienestar de los peces por dise&ntilde;o",
    "welfare.lead": "El bienestar de los peces es una consideraci&oacute;n central en RationCOUNTER, desde la geometr&iacute;a de paso hasta la estabilidad operativa.",
    "welfare.card1.title": "Manipulaci&oacute;n suave y continua",
    "welfare.card1.body": "El contador est&aacute; dise&ntilde;ado para favorecer un flujo suave con m&iacute;nima obstrucci&oacute;n, poco tiempo de manipulaci&oacute;n y una geometr&iacute;a controlada en la zona de conteo.",
    "welfare.card2.title": "Condiciones consistentes para operadores y peces",
    "welfare.card2.body": "La operaci&oacute;n estable sin arranques ni paradas bruscas favorece conteos fiables y ayuda a los equipos a manipular peces con mayor consistencia durante traslados y clasificaci&oacute;n.",
    "welfare.cta": "Habla con nosotros",
    "welfare.media.title": "Paso seco controlado fuera del agua",
    "welfare.media.body": "Los peces pasan individualmente por un canal controlado fuera del agua, donde cada pez puede observarse y analizarse en tiempo real con alta precisi&oacute;n y condiciones pr&aacute;cticas de manipulaci&oacute;n.",
    "welfare.media.caption": "Dise&ntilde;ado para un paso suave y un conteo preciso",
    "support.kicker": "Soporte",
    "support.title": "Servicio y soporte construidos alrededor del tiempo de actividad",
    "support.lead": "Queremos que el despliegue sea sencillo y la operaci&oacute;n estable, con mejoras de software y asistencia a lo largo del tiempo.",
    "support.card1.title": "Puesta en marcha",
    "support.card1.body": "Gu&iacute;a de instalaci&oacute;n y configuraci&oacute;n para ajustarse a la geometr&iacute;a y condiciones operativas de tu l&iacute;nea de manipulaci&oacute;n.",
    "support.card2.title": "Soporte remoto",
    "support.card2.body": "Resoluci&oacute;n r&aacute;pida de problemas y asistencia con registros claros, datos de sesi&oacute;n y seguimiento cercano.",
    "support.card3.title": "Mejora continua",
    "support.card3.body": "Mejoras continuas de software centradas en precisi&oacute;n, estabilidad y experiencia del operador.",
    "contact.title": "Contacto para informaci&oacute;n o una demo",
    "contact.lead": "Escribe a <strong>sales@ration.is</strong> para hablar de tu configuraci&oacute;n, obtener una propuesta o programar una demo.",
    "contact.cta": "Escribir a sales@ration.is",
    "footer.about.title": "Sobre Ration",
    "footer.about.body": "Mejorar los resultados de la acuicultura moderna combinando profundo conocimiento del sector, tecnolog&iacute;a robusta y colaboraci&oacute;n cercana con productores, fortaleciendo el bienestar de los peces, reduciendo el desperdicio y apoyando el crecimiento sostenible.",
    "footer.about.cta": "Construyamos una mejor acuicultura juntos.",
    "footer.partnerships.title": "Colaboraci&oacute;n y alianzas",
    "footer.copyright": "&copy; <span id=&quot;year&quot;></span> Ration. Todos los derechos reservados."
  });

  const selects = Array.from(document.querySelectorAll(".lang-select"));
  if (!selects.length) return;

  const description = document.querySelector("meta[name='description']");

  const applyTranslations = (lang) => {
    const dict = translations[lang] || translations.en;
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!dict[key]) return;
      el.innerHTML = dict[key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (!dict[key]) return;
      el.innerHTML = dict[key];
    });

    if (dict.title) document.title = dict.title;
    if (description && dict.description) description.setAttribute("content", dict.description);

    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  };

  const saved = localStorage.getItem("lang") || "en";
  selects.forEach((sel) => {
    sel.value = saved;
  });
  applyTranslations(saved);

  selects.forEach((sel) => {
    sel.addEventListener("change", (event) => {
      const lang = event.target.value;
      localStorage.setItem("lang", lang);
      selects.forEach((s) => {
        if (s !== event.target) s.value = lang;
      });
      applyTranslations(lang);
    });
  });
})();
