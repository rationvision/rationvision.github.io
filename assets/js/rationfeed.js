    (function () {
      const header = document.getElementById("siteHeader");
      const btn = document.getElementById("menuBtn");

      function setOpen(open) {
        header.dataset.open = open ? "true" : "false";
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      }

      btn?.addEventListener("click", () => {
        const open = header.dataset.open === "true";
        setOpen(!open);
      });

      document.addEventListener("click", (e) => {
        if (header.dataset.open !== "true") return;
        if (!header.contains(e.target)) setOpen(false);
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setOpen(false);
      });

      document.querySelectorAll(".mobile-nav a[href^='#']").forEach(a => {
        a.addEventListener("click", () => setOpen(false), { passive: true });
      });

      function onScroll() {
        header.dataset.scrolled = (window.scrollY > 8) ? "true" : "false";
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
        navAnchors.forEach(a => a.removeAttribute("aria-current"));
        (groups.get(id) || []).forEach(a => a.setAttribute("aria-current", "page"));
      };

      const sections = Array.from(groups.keys()).map(id => document.getElementById(id)).filter(Boolean);

      const io = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            break;
          }
        }
      }, { rootMargin: "-20% 0px -65% 0px", threshold: 0.01 });

      sections.forEach(sec => io.observe(sec));

      document.getElementById("year").textContent = new Date().getFullYear();
    })();

    // Config toggles
    (function () {
      const config = window.RATION_CONFIG || {};
      if (!config.hideFeedingSystems) return;

      const systems = document.getElementById("feedingSystems");
      if (systems) systems.style.display = "none";
    })();

    (function () {
      const $ = (id) => document.getElementById(id);

      const feedCost = $("feedCost");
      const monthlyFeed = $("monthlyFeed");
      const pctSaved = $("pctSaved");
      const tanks = $("tanks");
      const harvestPerTank = $("harvestPerTank");
      const pctYield = $("pctYield");
      const fishPrice = $("fishPrice");

      const outFeedSavings = $("outFeedSavings");
      const outRevenue = $("outRevenue");
      const outTotal = $("outTotal");

      function n(v) {
        const x = Number(v);
        return Number.isFinite(x) ? x : 0;
      }

      function money(value) {
        return new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: "EUR",
          maximumFractionDigits: 0
        }).format(n(value));
      }

      function recalc() {
        const cost = n(feedCost.value);
        const monthly = n(monthlyFeed.value);
        const savedPct = n(pctSaved.value) / 100;
        const feedSavings = cost * monthly * savedPct;

        const t = n(tanks.value);
        const harvest = n(harvestPerTank.value);
        const yieldPct = n(pctYield.value) / 100;
        const price = n(fishPrice.value);
        const extraRevenue = t * harvest * yieldPct * price;

        const total = feedSavings + extraRevenue;

        outFeedSavings.textContent = money(feedSavings);
        outRevenue.textContent = money(extraRevenue);
        outTotal.textContent = money(total);
      }

      ["input", "change"].forEach((evt) => {
        document.getElementById("calcForm2")?.addEventListener(evt, recalc, { passive: true });
      });

      recalc();
    })();

    // Language switcher (EN/NO/ES)
    (function () {
      const translations = { en: {}, no: {}, es: {} };

      Object.assign(translations.en, {
        "nav.home": "Home",
        "nav.overview": "Overview",
        "nav.how": "How it works",
        "nav.features": "Features",
        "nav.control": "Control",
        "nav.support": "Support",
        "nav.contact": "Contact",
        "cta.service": "Service & Support",
        "cta.demo": "Request a demo",
        "hero.pill": "RationFEED for Land-based aquaculture",
        "hero.title": "Boost feeding with less waste and cleaner water",
        "hero.body": "RationFeed counts uneaten pellets in real-time and can automatically adjust feeding to appetite &mdash; so you grow fish efficiently while protecting water quality.",
        "hero.cta.trial": "Start a 6-month trial",
        "hero.cta.how": "See how it works",
        "hero.bullet.one": "Increase feeding to appetite without overshooting &mdash; reduce wasted feed.",
        "hero.bullet.two": "Cleaner water and better conditions can support appetite and growth.",
        "hero.bullet.three": "Out-of-water camera system: easier install, stable operation, less maintenance.",
        "hero.caption": "Measures pellets at the effluent.",
        "problem.kicker": "THE CHALLENGE",
        "problem.title": "Feed is the largest cost in salmon farming",
        "problem.lead": "Adjusting feeding to appetite is challenging: pellets have low visibility in the tank and effluent water.",
        "problem.card1.title": "Low visibility, hard decisions",
        "problem.card1.body": "Feed pellets can be difficult to see in turbulent flows and mixed effluent. You may be feeding, but you don't truly know how much is being wasted.",
        "problem.card2.title": "Appetite changes quickly",
        "problem.card2.body": "Fish can react quickly to stress and eat less. If appetite drops, feeding strategy must adapt fast to avoid waste and preserve water quality.",
        "solution.kicker": "Solution",
        "solution.title": "Real-time pellet counting + automatic feeding control",
        "solution.lead": "RationFeed quantifies wasted pellets escaping through the effluent, then uses that signal to help you feed to appetite with minimal waste.",
        "solution.card1.title": "Counts uneaten pellets in real-time",
        "solution.card1.body": "A unique discovery in imaging makes it possible to distinguish pellets from fish waste and see through turbulent flows. Using patented optical methods and AI, pellets are counted with high precision.",
        "solution.card2.title": "Controls feeding automatically",
        "solution.card2.body": "Knowing the number of wasted pellets, RationFeed adjusts the feeding system to changes in appetite. Minimal waste improves water quality and further enhances appetite.",
        "solution.card3.title": "Complements your expertise",
        "solution.card3.body": "Together, we can improve conditions for your fish and create optimal growth. RationFeed helps identify causes of reduced feeding such as broken pellets, water quality issues, and stressful events.",
        "solution.media.title": "The only non-submerged camera system for precision feeding",
        "solution.media.body": "Easier to install, operate, and maintain out of water. It does not prevent water flow or dead fish removal, and control remains stable because it does not depend on routine cleaning.",
        "solution.media.caption": "Out-of-water installation makes maintenance easy."
      });
      Object.assign(translations.en, {
        "how.kicker": "How it works",
        "how.title": "From installation to automatic control",
        "how.lead": "A straightforward trial process designed to fit your existing tank and feeding system.",
        "how.step1.title": "Trial installation with custom fasteners",
        "how.step1.body": "If you order a RationFeed trial, we install a device with custom fasteners that fit your setup and distance between the device and outflow pipe.",
        "how.step1.spec": "<strong>Spec sheet:</strong> <a href=\"spec-sheet.pdf\" target=\"_blank\" rel=\"noopener\">Download detailed specifications</a> <span class=\"small\">(add your PDF next to this HTML file)</span>",
        "how.step2.title": "Connect utilities and begin counting",
        "how.step2.body": "After the device is connected to internet, electricity, and water, it can start counting pellets. Greater accuracy is expected within ~two weeks when image analysis has been optimized for your setup.",
        "how.step3.title": "Enable automatic feeding control",
        "how.step3.body": "For automatic control, RationFeed needs a local computer with read &amp; write access to the feeding system via internet (e.g., using a REST API). It can be connected to any feeding system that includes an API.",
        "features.kicker": "Features",
        "features.title": "Purpose-built for stable, verifiable pellet counting",
        "features.lead": "The device, optics, cloud interface, and alerts are designed around one outcome: feeding to appetite with confidence.",
        "features.card1.title": "Computer vision at the effluent",
        "features.card1.body": "Counts pellets at effluent so feeding can match appetite with less waste and cleaner water.",
        "features.card2.title": "Specialized optics",
        "features.card2.body": "Distinguishes pellets in fast, turbulent flows &mdash; improving accuracy and verification.",
        "features.card3.title": "Automatic feeding control",
        "features.card3.body": "Adjusts feeding system Appetite Factor optimally when under- or overfeeding happens.",
        "features.card4.title": "Out-of-water camera + self-cleaning",
        "features.card4.body": "Stable counting and control without routine cleaning hassles.",
        "features.card5.title": "Web-based user interface",
        "features.card5.body": "Cloud historical appetite + control data, with high-access parameters for automation tuning.",
        "features.card6.title": "Mobile alerts",
        "features.card6.body": "Notifications for prolonged maximum or minimum feeding.",
        "proof.kicker": "Feeding control",
        "proof.title": "See how RationFeed adjusts feeding automatically",
        "proof.lead": "RationFeed uses wasted pellet counts to adjust feeding (e.g., appetite factor) to match fish appetite and reduce waste.",
        "proof.caption": "Example: automatic appetite factor (AF) changes as pellet waste changes, keeping feeding near target.",
        "testimonials.kicker": "Testimonials",
        "testimonials.title": "What operators say",
        "quote.one.role": "Assistant Grow Out Manager",
        "quote.one.text": "&quot;We have excellent overall results using RationFeed to monitor and control our feeding 24/7.&quot;",
        "quote.two.company": "Customer (placeholder)",
        "quote.two.role": "Site Technician &middot; Land-based salmon facility",
        "quote.two.text": "&quot;Installing out of water made maintenance simple. We didn't have to interrupt flow or deal with routine cleaning to keep the system stable.&quot;",
      });
      Object.assign(translations.en, {
        "calc.title": "Calculator",
        "calc.note": "Adjust inputs to estimate monthly savings and potential extra revenue.",
        "calc.feedCost": "Cost of 1 kg feed (EUR)",
        "calc.monthlyFeed": "Average monthly feeding (kg)",
        "calc.pctSaved": "Percentage feed saved (%)",
        "calc.tanks": "Number of tanks",
        "calc.harvestPerTank": "kg harvest per tank",
        "calc.pctYield": "Yield increase (%)",
        "calc.fishPrice": "Price per kg fish (EUR)",
        "calc.impact": "Estimated impact",
        "calc.feedSavings": "Monthly feed savings",
        "calc.extraRevenue": "Potential extra revenue",
        "calc.total": "Combined monthly upside",
        "calc.fine": "These are simple scenario estimates for planning. Actual results depend on species, system design, and site conditions.",
        "support.kicker": "Risk reversal",
        "support.title": "6-month trial with a rental contract and refund option",
        "support.lead": "If you feel the device did not help improve operations during the trial period, you can return it for a full refund. Software updates add new capabilities over time.",
        "support.value.title": "Lasting value",
        "support.value.item1": "Rental contract so the device can be returned if not useful anymore",
        "support.value.item2": "Keeps saving money long-term",
        "support.value.item3": "New valuable software features over time (updates)",
        "support.value.item4": "Trusted advisors/partners on the line",
        "support.service.title": "Service & support",
        "support.service.item1": "Remote and local customer support",
        "support.service.item2": "Service agents in main market areas (add names/regions here)",
        "support.service.item3": "Refund on demo contract if you do not find it valuable",
        "contact.title": "Contact for information or a demo",
        "contact.lead": "Email <strong>sales@ration.is</strong> to discuss your setup, get a trial proposal, or schedule a demo.",
        "contact.cta": "Email sales@ration.is",
        "footer.tagline": "Precision feeding for land-based aquaculture &mdash; less waste, cleaner water, better decisions.",
        "footer.contact": "Contact:",
        "footer.service": "Service:",
        "footer.copyright": "&copy; <span id=&quot;year&quot;></span> Ration. All rights reserved.",
      });
      Object.assign(translations.no, {
        "nav.home": "Hjem",
        "nav.overview": "Oversikt",
        "nav.how": "Slik fungerer det",
        "nav.features": "Funksjoner",
        "nav.control": "Kontroll",
        "nav.support": "St&oslash;tte",
        "nav.contact": "Kontakt",
        "cta.service": "Service og support",
        "cta.demo": "Be om en demo",
        "hero.pill": "RationFEED for landbasert akvakultur",
        "hero.title": "Bedre f&ocirc;ring med mindre svinn og renere vann",
        "hero.body": "RationFeed teller uspiste pellets i sanntid og kan automatisk justere f&ocirc;ringen etter appetitt &mdash; slik at du produserer fisk effektivt og beskytter vannkvaliteten.",
        "hero.cta.trial": "Start en 6-m&aring;neders pr&oslash;ve",
        "hero.cta.how": "Se hvordan det fungerer",
        "hero.bullet.one": "F&ocirc;r etter appetitt uten &aring; overf&ocirc;re &mdash; reduser f&ocirc;rsvinn.",
        "hero.bullet.two": "Renere vann og bedre forhold kan st&oslash;tte appetitt og vekst.",
        "hero.bullet.three": "Kamerasystem over vann: enklere installasjon, stabil drift, mindre vedlikehold.",
        "hero.caption": "M&aring;ler pellets ved avl&oslash;pet.",
        "problem.kicker": "UTFORDRINGEN",
        "problem.title": "F&ocirc;r er den st&oslash;rste kostnaden i lakseoppdrett",
        "problem.lead": "Det er krevende &aring; f&ocirc;re etter appetitt: pellets har lav synlighet i karet og i avl&oslash;psvannet.",
        "problem.card1.title": "Lav sikt, vanskelige beslutninger",
        "problem.card1.body": "F&ocirc;rpellets kan v&aelig;re vanskelige &aring; se i turbulente str&oslash;mmer og blandet avl&oslash;p. Du kan f&ocirc;re, men vet ikke egentlig hvor mye som g&aring;r til spille.",
        "problem.card2.title": "Appetitten endrer seg raskt",
        "problem.card2.body": "Fisk kan reagere raskt p&aring; stress og spise mindre. Hvis appetitten faller, m&aring; f&ocirc;ringsstrategien tilpasses raskt for &aring; unng&aring; svinn og bevare vannkvaliteten.",
        "solution.kicker": "L&oslash;sning",
        "solution.title": "Sanntids pelletstelling + automatisk f&ocirc;ringskontroll",
        "solution.lead": "RationFeed kvantifiserer pellets som g&aring;r ut med avl&oslash;pet, og bruker signalet til &aring; f&ocirc;re etter appetitt med minimalt svinn.",
        "solution.card1.title": "Teller uspiste pellets i sanntid",
        "solution.card1.body": "En unik oppdagelse i bildeteknologi gj&oslash;r det mulig &aring; skille pellets fra fiskeavfall og se gjennom turbulente str&oslash;mmer. Med patenterte optiske metoder og AI telles pellets med h&oslash;y presisjon.",
        "solution.card2.title": "Kontrollerer f&ocirc;ringen automatisk",
        "solution.card2.body": "N&aring;r antall pellets som g&aring;r til spille er kjent, justerer RationFeed f&ocirc;ringssystemet etter endringer i appetitt. Mindre svinn forbedrer vannkvaliteten og kan &oslash;ke appetitten.",
        "solution.card3.title": "Utfyller din kompetanse",
        "solution.card3.body": "Sammen kan vi forbedre forholdene for fisken og skape optimal vekst. RationFeed hjelper med &aring; identifisere &aring;rsaker til redusert f&ocirc;ring som knuste pellets, vannkvalitetsproblemer og stressende hendelser.",
        "solution.media.title": "Det eneste ikke-nedsenkede kamerasystemet for presisjonsf&ocirc;ring",
        "solution.media.body": "Enklere &aring; installere, drifte og vedlikeholde over vann. Det hindrer ikke vannstr&oslash;m eller fjerning av d&oslash;d fisk, og kontrollen er stabil fordi den ikke avhenger av rutinemessig rengj&oslash;ring.",
        "solution.media.caption": "Installasjon over vann gj&oslash;r vedlikehold enkelt."
      });
      Object.assign(translations.no, {
        "how.kicker": "Slik fungerer det",
        "how.title": "Fra installasjon til automatisk kontroll",
        "how.lead": "En enkel pr&oslash;veprosess som passer eksisterende kar og f&ocirc;ringssystem.",
        "how.step1.title": "Pr&oslash;veinstallasjon med tilpassede fester",
        "how.step1.body": "Hvis du bestiller en RationFeed-pr&oslash;ve, installerer vi en enhet med tilpassede fester som passer oppsettet og avstanden mellom enheten og avl&oslash;psr&oslash;ret.",
        "how.step1.spec": "<strong>Spesifikasjon:</strong> <a href=\"spec-sheet.pdf\" target=\"_blank\" rel=\"noopener\">Last ned detaljerte spesifikasjoner</a> <span class=\"small\">(legg PDF-en ved siden av denne HTML-filen)</span>",
        "how.step2.title": "Koble til forsyninger og start telling",
        "how.step2.body": "N&aring;r enheten er koblet til internett, str&oslash;m og vann, kan den begynne &aring; telle pellets. H&oslash;yere n&oslash;yaktighet forventes innen ~to uker n&aring;r bildeanalysen er optimalisert for oppsettet ditt.",
        "how.step3.title": "Aktiver automatisk f&ocirc;ringskontroll",
        "how.step3.body": "For automatisk kontroll trenger RationFeed en lokal datamaskin med lese- og skriveadgang til f&ocirc;ringssystemet via internett (f.eks. ved &aring; bruke et REST API). Den kan kobles til ethvert f&ocirc;ringssystem som har et API.",
        "features.kicker": "Funksjoner",
        "features.title": "Bygget for stabil, verifiserbar pelletstelling",
        "features.lead": "Enheten, optikken, skygrensesnittet og varslene er designet rundt ett m&aring;l: &aring; f&ocirc;re etter appetitt med trygghet.",
        "features.card1.title": "Datamaskinsyn ved avl&oslash;pet",
        "features.card1.body": "Teller pellets ved avl&oslash;pet slik at f&ocirc;ringen kan matche appetitten med mindre svinn og renere vann.",
        "features.card2.title": "Spesialisert optikk",
        "features.card2.body": "Skiller pellets i raske, turbulente str&oslash;mmer &mdash; forbedrer n&oslash;yaktighet og verifisering.",
        "features.card3.title": "Automatisk f&ocirc;ringskontroll",
        "features.card3.body": "Justerer f&ocirc;ringssystemets Appetite Factor optimalt n&aring;r under- eller overf&ocirc;ring skjer.",
        "features.card4.title": "Kamera over vann + selvrensing",
        "features.card4.body": "Stabil telling og kontroll uten rutinemessig rengj&oslash;ring.",
        "features.card5.title": "Webbasert brukergrensesnitt",
        "features.card5.body": "Skybasert historikk for appetitt- og kontroll-data, med avanserte parametere for automatisering.",
        "features.card6.title": "Mobilvarsler",
        "features.card6.body": "Varsler ved langvarig maksimal eller minimal f&ocirc;ring.",
        "proof.kicker": "F&ocirc;ringskontroll",
        "proof.title": "Se hvordan RationFeed justerer f&ocirc;ringen automatisk",
        "proof.lead": "RationFeed bruker telling av spillpellets til &aring; justere f&ocirc;ringen (f.eks. appetite factor) slik at f&ocirc;ringen matcher appetitten og reduserer svinn.",
        "proof.caption": "Eksempel: automatisk appetite factor (AF) endres n&aring;r pellets-svinn endres, og holder f&ocirc;ringen n&aelig;r m&aring;let.",
        "testimonials.kicker": "Referanser",
        "testimonials.title": "Hva operat&oslash;rene sier",
        "quote.one.role": "Assisterende grow-out manager",
        "quote.one.text": "&quot;Vi har sv&aelig;rt gode resultater med RationFeed for &aring; overv&aring;ke og kontrollere f&ocirc;ringen v&aring;r 24/7.&quot;",
        "quote.two.company": "Kunde (plassholder)",
        "quote.two.role": "Driftstekniker &middot; Landbasert lakseanlegg",
        "quote.two.text": "&quot;Installasjon over vann gjorde vedlikehold enkelt. Vi m&aring;tte ikke stoppe gjennomstr&oslash;mningen eller h&aring;ndtere rutinemessig rengj&oslash;ring for &aring; holde systemet stabilt.&quot;",
      });
      Object.assign(translations.no, {
        "calc.title": "Kalkulator",
        "calc.note": "Juster inndata for &aring; estimere m&aring;nedlige besparelser og mulig ekstra inntekt.",
        "calc.feedCost": "Kostnad for 1 kg f&ocirc;r (EUR)",
        "calc.monthlyFeed": "Gjennomsnittlig m&aring;nedlig f&ocirc;ring (kg)",
        "calc.pctSaved": "Andel f&ocirc;r spart (%)",
        "calc.tanks": "Antall kar",
        "calc.harvestPerTank": "kg slakt per kar",
        "calc.pctYield": "Avlings&oslash;kning (%)",
        "calc.fishPrice": "Pris per kg fisk (EUR)",
        "calc.impact": "Estimert effekt",
        "calc.feedSavings": "M&aring;nedlige f&ocirc;rbesparelser",
        "calc.extraRevenue": "Potensiell ekstra inntekt",
        "calc.total": "Samlet m&aring;nedlig gevinst",
        "calc.fine": "Dette er enkle scenarieestimater for planlegging. Faktiske resultater avhenger av art, systemdesign og lokale forhold.",
        "support.kicker": "Risikoreversering",
        "support.title": "6-m&aring;neders pr&oslash;ve med leiekontrakt og refusjonsmulighet",
        "support.lead": "Hvis du mener at enheten ikke bidro til bedre drift i pr&oslash;veperioden, kan du returnere den for full refusjon. Programvareoppdateringer gir nye funksjoner over tid.",
        "support.value.title": "Varig verdi",
        "support.value.item1": "Leiekontrakt slik at enheten kan returneres hvis den ikke lenger er nyttig",
        "support.value.item2": "Fortsetter &aring; spare penger p&aring; lang sikt",
        "support.value.item3": "Nye verdifulle programvarefunksjoner over tid (oppdateringer)",
        "support.value.item4": "R&aring;dgivere/partnere p&aring; linjen",
        "support.service.title": "Service og support",
        "support.service.item1": "Fjern- og lokal kundest&oslash;tte",
        "support.service.item2": "Serviceagenter i hovedmarkeder (legg til navn/regioner her)",
        "support.service.item3": "Refusjon p&aring; demokontrakt hvis du ikke finner den verdifull",
        "contact.title": "Kontakt for informasjon eller demo",
        "contact.lead": "Send e-post til <strong>sales@ration.is</strong> for &aring; diskutere ditt oppsett, f&aring; et pr&oslash;veforslag eller avtale en demo.",
        "contact.cta": "Send e-post til sales@ration.is",
        "footer.tagline": "Presisjonsf&ocirc;ring for landbasert akvakultur &mdash; mindre svinn, renere vann, bedre beslutninger.",
        "footer.contact": "Kontakt:",
        "footer.service": "Service:",
        "footer.copyright": "&copy; <span id=&quot;year&quot;></span> Ration. Alle rettigheter forbeholdt.",
      });

      Object.assign(translations.es, {
        "nav.home": "Inicio",
        "nav.overview": "Resumen",
        "nav.how": "C&oacute;mo funciona",
        "nav.features": "Caracter&iacute;sticas",
        "nav.control": "Control",
        "nav.support": "Soporte",
        "nav.contact": "Contacto",
        "cta.service": "Servicio y soporte",
        "cta.demo": "Solicitar una demo",
        "hero.pill": "RationFEED para acuicultura en tierra",
        "hero.title": "Mejora la alimentaci&oacute;n con menos desperdicio y agua m&aacute;s limpia",
        "hero.body": "RationFeed cuenta los pellets no consumidos en tiempo real y puede ajustar autom&aacute;ticamente la alimentaci&oacute;n seg&uacute;n el apetito &mdash; para que produzcas peces de forma eficiente y protejas la calidad del agua.",
        "hero.cta.trial": "Iniciar una prueba de 6 meses",
        "hero.cta.how": "Ver c&oacute;mo funciona",
        "hero.bullet.one": "Aumenta la alimentaci&oacute;n seg&uacute;n el apetito sin excederte &mdash; reduce el desperdicio de alimento.",
        "hero.bullet.two": "Agua m&aacute;s limpia y mejores condiciones pueden favorecer el apetito y el crecimiento.",
        "hero.bullet.three": "C&aacute;mara fuera del agua: instalaci&oacute;n m&aacute;s sencilla, operaci&oacute;n estable, menos mantenimiento.",
        "hero.caption": "Mide los pellets en el efluente.",
        "problem.kicker": "EL DESAF&Iacute;O",
        "problem.title": "El alimento es el mayor costo en la salmonicultura",
        "problem.lead": "Ajustar la alimentaci&oacute;n al apetito es dif&iacute;cil: los pellets tienen poca visibilidad en el tanque y en el agua del efluente.",
        "problem.card1.title": "Baja visibilidad, decisiones dif&iacute;ciles",
        "problem.card1.body": "Los pellets de alimento pueden ser dif&iacute;ciles de ver en flujos turbulentos y efluente mezclado. Puedes estar alimentando, pero no sabes realmente cu&aacute;nto se desperdicia.",
        "problem.card2.title": "El apetito cambia r&aacute;pido",
        "problem.card2.body": "Los peces pueden reaccionar r&aacute;pidamente al estr&eacute;s y comer menos. Si el apetito baja, la estrategia de alimentaci&oacute;n debe adaptarse r&aacute;pido para evitar desperdicio y preservar la calidad del agua.",
        "solution.kicker": "Soluci&oacute;n",
        "solution.title": "Conteo de pellets en tiempo real + control autom&aacute;tico de alimentaci&oacute;n",
        "solution.lead": "RationFeed cuantifica los pellets desperdiciados que salen por el efluente y usa esa se&ntilde;al para ayudarte a alimentar seg&uacute;n el apetito con m&iacute;nimo desperdicio.",
        "solution.card1.title": "Cuenta pellets no consumidos en tiempo real",
        "solution.card1.body": "Un descubrimiento &uacute;nico en imagen permite distinguir pellets de desechos de pescado y ver a trav&eacute;s de flujos turbulentos. Con m&eacute;todos &oacute;pticos patentados e IA, los pellets se cuentan con alta precisi&oacute;n.",
        "solution.card2.title": "Controla la alimentaci&oacute;n autom&aacute;ticamente",
        "solution.card2.body": "Conociendo la cantidad de pellets desperdiciados, RationFeed ajusta el sistema de alimentaci&oacute;n seg&uacute;n los cambios de apetito. Menos desperdicio mejora la calidad del agua y puede aumentar el apetito.",
        "solution.card3.title": "Complementa tu experiencia",
        "solution.card3.body": "Juntos podemos mejorar las condiciones para tus peces y lograr un crecimiento &oacute;ptimo. RationFeed ayuda a identificar causas de menor alimentaci&oacute;n, como pellets rotos, problemas de calidad de agua y eventos estresantes.",
        "solution.media.title": "El &uacute;nico sistema de c&aacute;mara no sumergida para alimentaci&oacute;n de precisi&oacute;n",
        "solution.media.body": "M&aacute;s f&aacute;cil de instalar, operar y mantener fuera del agua. No impide el flujo de agua ni la retirada de peces muertos, y el control es estable porque no depende de la limpieza rutinaria.",
        "solution.media.caption": "La instalaci&oacute;n fuera del agua facilita el mantenimiento."
      });
      Object.assign(translations.es, {
        "how.kicker": "C&oacute;mo funciona",
        "how.title": "De la instalaci&oacute;n al control autom&aacute;tico",
        "how.lead": "Un proceso de prueba sencillo dise&ntilde;ado para ajustarse a tu tanque y sistema de alimentaci&oacute;n.",
        "how.step1.title": "Instalaci&oacute;n de prueba con fijaciones personalizadas",
        "how.step1.body": "Si pides una prueba de RationFeed, instalamos un dispositivo con fijaciones personalizadas que se ajustan a tu configuraci&oacute;n y a la distancia entre el dispositivo y la tuber&iacute;a de salida.",
        "how.step1.spec": "<strong>Ficha t&eacute;cnica:</strong> <a href=\"spec-sheet.pdf\" target=\"_blank\" rel=\"noopener\">Descargar especificaciones detalladas</a> <span class=\"small\">(agrega tu PDF junto a este archivo HTML)</span>",
        "how.step2.title": "Conecta servicios y empieza a contar",
        "how.step2.body": "Despu&eacute;s de conectar el dispositivo a internet, electricidad y agua, puede empezar a contar pellets. Se espera mayor precisi&oacute;n en ~dos semanas cuando el an&aacute;lisis de imagen se haya optimizado para tu configuraci&oacute;n.",
        "how.step3.title": "Habilita el control autom&aacute;tico de alimentaci&oacute;n",
        "how.step3.body": "Para el control autom&aacute;tico, RationFeed necesita un computador local con acceso de lectura y escritura al sistema de alimentaci&oacute;n por internet (p. ej., usando una API REST). Puede conectarse a cualquier sistema de alimentaci&oacute;n que incluya una API.",
        "features.kicker": "Caracter&iacute;sticas",
        "features.title": "Dise&ntilde;ado para un conteo de pellets estable y verificable",
        "features.lead": "El dispositivo, la &oacute;ptica, la interfaz en la nube y las alertas est&aacute;n dise&ntilde;ados para un solo resultado: alimentar seg&uacute;n el apetito con confianza.",
        "features.card1.title": "Visi&oacute;n por computador en el efluente",
        "features.card1.body": "Cuenta pellets en el efluente para que la alimentaci&oacute;n iguale el apetito con menos desperdicio y agua m&aacute;s limpia.",
        "features.card2.title": "&Oacute;ptica especializada",
        "features.card2.body": "Distingue pellets en flujos r&aacute;pidos y turbulentos &mdash; mejora la precisi&oacute;n y la verificaci&oacute;n.",
        "features.card3.title": "Control autom&aacute;tico de alimentaci&oacute;n",
        "features.card3.body": "Ajusta el Appetite Factor del sistema de alimentaci&oacute;n de forma &oacute;ptima cuando hay sub- o sobrealimentaci&oacute;n.",
        "features.card4.title": "C&aacute;mara fuera del agua + autolimpieza",
        "features.card4.body": "Conteo y control estables sin limpiezas rutinarias.",
        "features.card5.title": "Interfaz web",
        "features.card5.body": "Historial de apetito y control en la nube, con par&aacute;metros de alto acceso para la automatizaci&oacute;n.",
        "features.card6.title": "Alertas m&oacute;viles",
        "features.card6.body": "Notificaciones por alimentaci&oacute;n m&aacute;xima o m&iacute;nima prolongada.",
        "proof.kicker": "Control de alimentaci&oacute;n",
        "proof.title": "Mira c&oacute;mo RationFeed ajusta la alimentaci&oacute;n autom&aacute;ticamente",
        "proof.lead": "RationFeed usa el conteo de pellets desperdiciados para ajustar la alimentaci&oacute;n (p. ej., appetite factor) y alinear el apetito de los peces, reduciendo el desperdicio.",
        "proof.caption": "Ejemplo: el appetite factor (AF) autom&aacute;tico cambia cuando cambia el desperdicio de pellets, manteniendo la alimentaci&oacute;n cerca del objetivo.",
        "testimonials.kicker": "Testimonios",
        "testimonials.title": "Lo que dicen los operadores",
        "quote.one.role": "Asistente de grow-out manager",
        "quote.one.text": "&quot;Tenemos excelentes resultados generales usando RationFeed para monitorear y controlar nuestra alimentaci&oacute;n 24/7.&quot;",
        "quote.two.company": "Cliente (marcador de posici&oacute;n)",
        "quote.two.role": "T&eacute;cnico de sitio &middot; Instalaci&oacute;n de salm&oacute;n en tierra",
        "quote.two.text": "&quot;La instalaci&oacute;n fuera del agua hizo que el mantenimiento fuera sencillo. No tuvimos que interrumpir el flujo ni lidiar con limpiezas rutinarias para mantener el sistema estable.&quot;",
      });
      Object.assign(translations.es, {
        "calc.title": "Calculadora",
        "calc.note": "Ajusta los datos para estimar ahorros mensuales y posibles ingresos adicionales.",
        "calc.feedCost": "Costo de 1 kg de alimento (EUR)",
        "calc.monthlyFeed": "Alimentaci&oacute;n mensual promedio (kg)",
        "calc.pctSaved": "Porcentaje de alimento ahorrado (%)",
        "calc.tanks": "N&uacute;mero de tanques",
        "calc.harvestPerTank": "kg de cosecha por tanque",
        "calc.pctYield": "Aumento de rendimiento (%)",
        "calc.fishPrice": "Precio por kg de pescado (EUR)",
        "calc.impact": "Impacto estimado",
        "calc.feedSavings": "Ahorro mensual de alimento",
        "calc.extraRevenue": "Ingresos adicionales potenciales",
        "calc.total": "Beneficio mensual combinado",
        "calc.fine": "Estas son estimaciones simples para planificaci&oacute;n. Los resultados reales dependen de la especie, el dise&ntilde;o del sistema y las condiciones del sitio.",
        "support.kicker": "Reversi&oacute;n de riesgo",
        "support.title": "Prueba de 6 meses con contrato de alquiler y opci&oacute;n de reembolso",
        "support.lead": "Si consideras que el dispositivo no ayud&oacute; a mejorar las operaciones durante la prueba, puedes devolverlo para un reembolso completo. Las actualizaciones de software agregan nuevas funciones con el tiempo.",
        "support.value.title": "Valor duradero",
        "support.value.item1": "Contrato de alquiler para poder devolver el dispositivo si deja de ser &uacute;til",
        "support.value.item2": "Sigue ahorrando dinero a largo plazo",
        "support.value.item3": "Nuevas funciones de software valiosas con el tiempo (actualizaciones)",
        "support.value.item4": "Asesores/partners disponibles",
        "support.service.title": "Servicio y soporte",
        "support.service.item1": "Soporte remoto y local al cliente",
        "support.service.item2": "Agentes de servicio en las principales &aacute;reas de mercado (agrega nombres/regiones aqu&iacute;)",
        "support.service.item3": "Reembolso del contrato de demo si no te resulta valioso",
        "contact.title": "Contacto para informaci&oacute;n o demo",
        "contact.lead": "Escribe a <strong>sales@ration.is</strong> para hablar de tu configuraci&oacute;n, obtener una propuesta de prueba o agendar una demo.",
        "contact.cta": "Escribir a sales@ration.is",
        "footer.tagline": "Alimentaci&oacute;n de precisi&oacute;n para acuicultura en tierra &mdash; menos desperdicio, agua m&aacute;s limpia, mejores decisiones.",
        "footer.contact": "Contacto:",
        "footer.service": "Servicio:",
        "footer.copyright": "&copy; <span id=&quot;year&quot;></span> Ration. Todos los derechos reservados.",
      });

      const selects = Array.from(document.querySelectorAll(".lang-select"));
      if (!selects.length) return;

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

        const yearEl = document.getElementById("year");
        if (yearEl) yearEl.textContent = new Date().getFullYear();
      };

      const saved = localStorage.getItem("lang") || "en";
      selects.forEach((sel) => { sel.value = saved; });
      applyTranslations(saved);

      selects.forEach((sel) => {
        sel.addEventListener("change", (event) => {
          const lang = event.target.value;
          localStorage.setItem("lang", lang);
          selects.forEach((s) => { if (s !== event.target) s.value = lang; });
          applyTranslations(lang);
        });
      });
    })();
  



