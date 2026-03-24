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

      document.querySelectorAll(".mobile-nav a[href^='#']").forEach(a => {
        a.addEventListener("click", () => setOpen(false), { passive: true });
      });

      function onScroll() {
        header.dataset.scrolled = (window.scrollY > 8) ? "true" : "false";
      }
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });

      // Nav highlighting (section links only)
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
      const contactTarget = config.hideHomeContactForm ? "#contact-sales" : "#contact";

      document.querySelectorAll("[data-contact-link]").forEach((link) => {
        link.setAttribute("href", contactTarget);
      });

      if (!config.hideHomeContactForm) return;

      const contactSection = document.getElementById("contact");
      if (contactSection) contactSection.style.display = "none";

      document.querySelectorAll("a[href='#contact']").forEach((link) => {
        link.style.display = "none";
        link.setAttribute("aria-hidden", "true");
      });

      document.querySelectorAll(".cta-email").forEach((el) => {
        el.style.display = "block";
      });
    })();

    // Contact form -> mailto
    (function(){
      const form = document.getElementById('contactForm');
      if(!form) return;

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const company = document.getElementById('company').value.trim();
        const country = document.getElementById('country').value.trim();
        const notes = document.getElementById('notes').value.trim();

        const interests = Array.from(form.querySelectorAll('input[name="interest"]:checked')).map(i => i.value);

        const subject = encodeURIComponent('Ration inquiry');
        const bodyLines = [
          `Name: ${name}`,
          `Email: ${email}`,
          `Company: ${company}`,
          `Country: ${country}`,
          `Interested in: ${interests.length ? interests.join(', ') : 'â€”'}`,
          '',
          'Additional information:',
          notes || 'â€”'
        ];
        const body = encodeURIComponent(bodyLines.join('\n'));

        window.location.href = `mailto:info@ration.is?subject=${subject}&body=${body}`;
      });
    })();

    // Language switcher (EN/NO/ES)
    (function () {
      const translations = {
        en: {
          "header.tagline": "Vision for Aquaculture",
          "nav.products": "View products",
          "nav.about": "About us",
          "nav.contact": "Contact",
          "cta.products": "Products",
          "cta.feed": "View RationFEED",
          "cta.service": "Service & Support",
          "cta.contact": "Contact us",
          "hero.title": "Join our Vision for<br/>Sustainable Aquaculture",
          "hero.body": "Ration develops practical, data-driven technology that helps land-based fish farms operate efficiently, responsibly, and profitably.",
          "hero.cta": "About Ration",
          "hero.event.seafood": "Seafood Expo Global 2026",
          "hero.event.aquasur": "Aqua Sur 2026",
          "value.one.title": "Technology with purpose",
          "value.one.body": "Solutions designed to reduce waste, improve consistency, and integrate seamlessly into your operations.",
          "value.two.title": "Actionable insights",
          "value.two.body": "Clear, usable information that supports better decisions, stronger fish welfare, and improved production economics.",
          "value.three.title": "A long-term partner",
          "value.three.body": "Built on hands-on experience â€” we work alongside customers to support continuous improvement for a sustainable future.",
          "section.smarter.title": "Smarter Aquaculture starts with Ration",
          "info.one.title": "Our technology improves performance and profitability",
          "info.one.body": "Real-time monitoring via computer vision and sensors that track fish behavior, health indicators, and environmental conditions for better insights.",
          "info.two.title": "Quality control and precision",
          "info.two.body": "A system that provides consistent, verifiable measurementsâ€”supporting stable operations and reduced labor.",
          "info.three.title": "Environmental impact",
          "info.three.body": "Lower waste and optimized systems reduce the overall footprint of production and contribute to more sustainable aquaculture.",
          "info.four.title": "Fish welfare",
          "info.four.body": "Our products help maintain better conditions and reduce stress through improved control.",
          "products.headline": "Product line",
          "product.feed": "Feed monitoring system<br /><strong>RationFEED</strong>",
          "product.ova": "Counting and quality control of salmon ova<br /><strong>RationOVA</strong>",
          "product.counter": "Counting and biomass estimation of live fish<br /><strong>RationCOUNTER</strong>",
          "product.menu.feed": "RationFEED",
          "product.menu.counter": "RationCOUNTER",
          "product.learn": "Learn more â†’",
          "cta.title": "Contact our Sales and Service Agents",
          "cta.body": "Letâ€™s get started. Contact your Ration representative today to learn more about optimizing your production efficiency with the power of Ration technology.",
          "cta.email": "Email us at <a href=\"mailto:sales@ration.is\">sales@ration.is</a>",
          "cta.button": "Talk to our Team",
          "about.kicker": "About",
          "about.title": "About Ration",
          "about.lead": "To improve modern aquaculture outcomes by combining deep industry knowledge, robust technology, and strong collaborations with producers.",
          "about.drive.title": "What Drives Us",
          "about.drive.body": "Our mission is to unify aquaculture data sources in a practical wayâ€”so teams can reduce costs and improve consistency without adding complexity.",
          "about.exp.title": "Experience That Matters",
          "about.exp.body": "For over 20 years, our team has designed and delivered high-tech systems to land-based operations worldwide. This experience, and our collaboration with customers, shapes how we design technology aligned with what farms actually need.",
          "team.bio.hans": "Hans brings expertise in computer vision and AI to the team. With a PhD in Electrical- and Computer Engineering focused computer vision, he has designed industrial-grade vision systems robust for demanding environments. His work bridges academic innovation with practical, scalable engineering.",
          "team.bio.bjorg": "Bjorg brings extensive experience in global marketing and commercial strategy across the aquaculture sector. She has led international teams, launched products into new markets, developed market strategies, and driven commercial growth.",
          "team.bio.david": "David brings more than two decades of commercial aquaculture experience. For 24 years, he served as sales manager at Vaki Aquaculture, supporting farms and hatcheries globally. His hands-on knowledge, industry relationships, and operational insight make him one of the sector's most experienced commercial specialists. Contact David about your project today.",
          "team.bio.thorvaldur": "Ãžorvaldur is a pioneer in modern aquaculture technology. As a Technical Lead in Vaki, he has decades of operational and commercial experience, strategic insight, and sector knowledge, which he brings to the team.",
          "team.bio.gunnar": "Gunnar is an electrical engineer, with experience in control systems and power distribution. Before joining Ration, he worked at designing and implementing electrical architectures for industrial environments. He contributes a strong foundation in electrical design, reliability engineering, and system integration.",
          "team.bio.elias": "ElÃ­as specializes in robotics and mechatronics with experience across computer vision, motion planning, and medical robotics. Previously, focused on force control in pneumatic robotic instruments for minimally invasive surgery, blending precision engineering with advanced control theory.",
          "contact.title": "Get rational with Ration.",
          "form.name": "Name *",
          "form.email": "Email *",
          "form.company": "Company *",
          "form.country": "Country *",
          "form.products": "What products are you interested in?",
          "form.general": "General talk",
          "form.additional": "Additional information",
          "form.placeholder.name": "Name",
          "form.placeholder.email": "Email",
          "form.placeholder.company": "Company name",
          "form.placeholder.country": "Where are you?",
          "form.placeholder.notes": "Comments or thoughts you'd like to share with us",
          "form.submit": "Contact Us",
          "form.note": "This form opens your email client (mailto). Replace with your backend later if desired.",
          "form.reach": "Reach us at <a href=\"mailto:info@ration.is\">info@ration.is</a>",
          "footer.about.title": "About Ration",
          "footer.about.body": "To improve modern aquaculture outcomes by combining deep industry knowledge, robust technology, and close collaboration with producers, strengthening fish welfare, reducing waste, and supporting sustainable growth.",
          "footer.about.cta": "Let's build better aquaculture together.",
          "footer.partnerships.title": "Collaboration &amp; Partnerships",
          "footer.copyright": "&copy; <span id=\"year\"></span> Ration. All rights reserved.",
        },
        no: {
          "header.tagline": "Visjon for akvakultur",
          "nav.products": "Se produkter",
          "nav.about": "Om oss",
          "nav.contact": "Kontakt",
          "cta.products": "Produkter",
          "cta.feed": "Se RationFEED",
          "cta.service": "Service og support",
          "cta.contact": "Kontakt oss",
          "hero.title": "Bli med pÃ¥ vÃ¥r visjon for<br/>bÃ¦rekraftig akvakultur",
          "hero.body": "Ration utvikler praktisk, datadrevet teknologi som hjelper landbaserte oppdrettsanlegg med Ã¥ drive mer effektivt, ansvarlig og lÃ¸nnsomt.",
          "hero.cta": "Om Ration",
          "hero.event.seafood": "Seafood Expo Global 2026",
          "hero.event.aquasur": "Aqua Sur 2026",
          "value.one.title": "Teknologi med formÃ¥l",
          "value.one.body": "LÃ¸sninger utformet for Ã¥ redusere svinn, forbedre konsistens og integrere sÃ¸mlÃ¸st i driften.",
          "value.two.title": "Handlingsrettet innsikt",
          "value.two.body": "Klar og brukbar informasjon som stÃ¸tter bedre beslutninger, bedre fiskevelferd og bedre produksjonsÃ¸konomi.",
          "value.three.title": "En langsiktig partner",
          "value.three.body": "Bygget pÃ¥ praktisk erfaring â€” vi jobber side om side med kunder for kontinuerlig forbedring og en bÃ¦rekraftig fremtid.",
          "section.smarter.title": "Smartere akvakultur starter med Ration",
          "info.one.title": "VÃ¥r teknologi forbedrer ytelse og lÃ¸nnsomhet",
          "info.one.body": "SanntidsovervÃ¥king via datavisjon og sensorer som sporer fiskens atferd, helseindikatorer og miljÃ¸forhold for bedre innsikt.",
          "info.two.title": "Kvalitetskontroll og presisjon",
          "info.two.body": "Et system som gir konsistente, verifiserbare mÃ¥linger â€” som stÃ¸tter stabil drift og redusert arbeidsbelastning.",
          "info.three.title": "MiljÃ¸pÃ¥virkning",
          "info.three.body": "Mindre avfall og optimaliserte systemer reduserer det totale fotavtrykket og bidrar til mer bÃ¦rekraftig akvakultur.",
          "info.four.title": "Fiskevelferd",
          "info.four.body": "VÃ¥re produkter hjelper med Ã¥ opprettholde bedre forhold og redusere stress gjennom bedre kontroll.",
          "products.headline": "Produktlinje",
          "product.feed": "FÃ´rovervÃ¥kingssystem<br /><strong>RationFEED</strong>",
          "product.ova": "Telling og kvalitetskontroll av lakserogn<br /><strong>RationOVA</strong>",
          "product.counter": "Telling og biomasseestimering av levende fisk<br /><strong>RationCOUNTER</strong>",
          "product.menu.feed": "RationFEED",
          "product.menu.counter": "RationCOUNTER",
          "product.learn": "Les mer â†’",
          "cta.title": "Kontakt vÃ¥re salgs- og serviceagenter",
          "cta.body": "La oss komme i gang. Kontakt din Ration-representant i dag for Ã¥ lÃ¦re mer om hvordan du kan optimalisere produksjonen med Ration-teknologi.",
          "cta.email": "E-post: <a href=\"mailto:sales@ration.is\">sales@ration.is</a>",
          "cta.button": "Snakk med teamet vÃ¥rt",
          "about.kicker": "Om",
          "about.title": "Om Ration",
          "about.lead": "Ã… forbedre resultater i moderne akvakultur ved Ã¥ kombinere dyp bransjekunnskap, robust teknologi og sterke samarbeid med produsenter.",
          "about.drive.title": "Hva som driver oss",
          "about.drive.body": "VÃ¥r misjon er Ã¥ samle akvakulturdata pÃ¥ en praktisk mÃ¥te â€” slik at team kan redusere kostnader og forbedre konsistens uten ekstra kompleksitet.",
          "about.exp.title": "Erfaring som betyr noe",
          "about.exp.body": "I over 20 Ã¥r har teamet vÃ¥rt designet og levert hÃ¸yteknologiske systemer til landbaserte anlegg over hele verden. Denne erfaringen, og samarbeidet med kundene, former hvordan vi designer teknologi i trÃ¥d med det oppdrettsanlegg faktisk trenger.",
          "team.bio.hans": "Hans har ekspertise innen datavisjon og AI. Med en doktorgrad i elektro- og datateknikk med fokus pÃ¥ datavisjon har han designet industrikvalitets visjonssystemer robuste for krevende miljÃ¸er. Arbeidet hans bygger bro mellom akademisk innovasjon og praktisk, skalerbar ingeniÃ¸rkunst.",
          "team.bio.bjorg": "Bjorg har omfattende erfaring innen global markedsfÃ¸ring og kommersiell strategi i akvakultursektoren. Hun har ledet internasjonale team, lansert produkter i nye markeder, utviklet markedsstrategier og drevet kommersiell vekst.",
          "team.bio.david": "David har over to tiÃ¥r med kommersiell erfaring i akvakultur. I 24 Ã¥r var han salgsleder i Vaki Aquaculture og stÃ¸ttet oppdrettsanlegg globalt. Hans praktiske kunnskap, bransjerelasjoner og operasjonelle innsikt gjÃ¸r ham til en av sektorens mest erfarne kommersielle spesialister. Kontakt David om prosjektet ditt i dag.",
          "team.bio.thorvaldur": "Ãžorvaldur er en pioner innen moderne akvakulturteknologi. Som teknisk leder i Vaki har han tiÃ¥r med operasjonell og kommersiell erfaring, strategisk innsikt og sektorkunnskap som han tar med inn i teamet.",
          "team.bio.gunnar": "Gunnar er elektroingeniÃ¸r med erfaring innen styringssystemer og kraftdistribusjon. FÃ¸r han begynte i Ration jobbet han med Ã¥ designe og implementere elektriske arkitekturer for industrielle miljÃ¸er. Han bidrar med et sterkt grunnlag innen elektrisk design, pÃ¥litelighetsingeniÃ¸rfag og systemintegrasjon.",
          "team.bio.elias": "ElÃ­as spesialiserer seg i robotikk og mekatronikk med erfaring innen datavisjon, bevegelsesplanlegging og medisinsk robotikk. Tidligere jobbet han med kraftkontroll i pneumatiske robotinstrumenter for minimalt invasiv kirurgi, og kombinerer presisjonsingeniÃ¸rkunst med avansert reguleringsteori.",
          "contact.title": "Bli rasjonell med Ration.",
          "form.name": "Navn *",
          "form.email": "E-post *",
          "form.company": "Selskap *",
          "form.country": "Land *",
          "form.products": "Hvilke produkter er du interessert i?",
          "form.general": "Generell prat",
          "form.additional": "Tilleggsinformasjon",
          "form.placeholder.name": "Navn",
          "form.placeholder.email": "E-post",
          "form.placeholder.company": "Selskapsnavn",
          "form.placeholder.country": "Hvor er du?",
          "form.placeholder.notes": "Kommentarer eller tanker du vil dele med oss",
          "form.submit": "Kontakt oss",
          "form.note": "Dette skjemaet Ã¥pner e-postklienten din (mailto). Bytt til backend senere om Ã¸nskelig.",
          "form.reach": "Kontakt oss pÃ¥ <a href=\"mailto:info@ration.is\">info@ration.is</a>",
          "footer.about.title": "Om Ration",
          "footer.about.body": "Forbedre resultatene i moderne akvakultur ved &aring; kombinere dyp bransjekunnskap, robust teknologi og n&aelig;rt samarbeid med produsenter, som styrker fiskevelferd, reduserer svinn og st&oslash;tter b&aelig;rekraftig vekst.",
          "footer.about.cta": "La oss bygge bedre akvakultur sammen.",
          "footer.partnerships.title": "Samarbeid og partnerskap",
          "footer.copyright": "&copy; <span id=\"year\"></span> Ration. Alle rettigheter reservert.",
        },
        es: {
          "header.tagline": "VisiÃ³n para la acuicultura",
          "nav.products": "Ver productos",
          "nav.about": "Sobre nosotros",
          "nav.contact": "Contacto",
          "cta.products": "Productos",
          "cta.feed": "Ver RationFEED",
          "cta.service": "Servicio y soporte",
          "cta.contact": "ContÃ¡ctanos",
          "hero.title": "Ãšnete a nuestra visiÃ³n de<br/>acuicultura sostenible",
          "hero.body": "Ration desarrolla tecnologÃ­a prÃ¡ctica y basada en datos que ayuda a las granjas acuÃ­colas en tierra a operar de forma mÃ¡s eficiente, responsable y rentable.",
          "hero.cta": "Sobre Ration",
          "hero.event.seafood": "Seafood Expo Global 2026",
          "hero.event.aquasur": "Aqua Sur 2026",
          "value.one.title": "TecnologÃ­a con propÃ³sito",
          "value.one.body": "Soluciones diseÃ±adas para reducir el desperdicio, mejorar la consistencia e integrarse sin fricciones en tus operaciones.",
          "value.two.title": "InformaciÃ³n accionable",
          "value.two.body": "InformaciÃ³n clara y utilizable que respalda mejores decisiones, mayor bienestar de los peces y mejores resultados econÃ³micos.",
          "value.three.title": "Un socio a largo plazo",
          "value.three.body": "Basado en experiencia prÃ¡ctica â€” trabajamos junto a los clientes para la mejora continua y un futuro sostenible.",
          "section.smarter.title": "Una acuicultura mÃ¡s inteligente comienza con Ration",
          "info.one.title": "Nuestra tecnologÃ­a mejora el rendimiento y la rentabilidad",
          "info.one.body": "Monitoreo en tiempo real mediante visiÃ³n por computadora y sensores que siguen el comportamiento de los peces, indicadores de salud y condiciones ambientales para obtener mejores insights.",
          "info.two.title": "Control de calidad y precisiÃ³n",
          "info.two.body": "Un sistema que ofrece mediciones consistentes y verificables â€” apoyando operaciones estables y menos trabajo manual.",
          "info.three.title": "Impacto ambiental",
          "info.three.body": "Menos desperdicio y sistemas optimizados reducen la huella total de producciÃ³n y contribuyen a una acuicultura mÃ¡s sostenible.",
          "info.four.title": "Bienestar de los peces",
          "info.four.body": "Nuestros productos ayudan a mantener mejores condiciones y reducir el estrÃ©s mediante un control mejorado.",
          "products.headline": "Línea de productos",
          "product.feed": "Sistema de monitoreo de alimento<br /><strong>RationFEED</strong>",
          "product.ova": "Conteo y control de calidad de ovas de salmÃ³n<br /><strong>RationOVA</strong>",
          "product.counter": "Conteo y estimaciÃ³n de biomasa de peces vivos<br /><strong>RationCOUNTER</strong>",
          "product.menu.feed": "RationFEED",
          "product.menu.counter": "RationCOUNTER",
          "product.learn": "MÃ¡s informaciÃ³n â†’",
          "cta.title": "Contacta a nuestros agentes de ventas y servicio",
          "cta.body": "Empecemos. Contacta hoy a tu representante de Ration para conocer cÃ³mo optimizar tu eficiencia de producciÃ³n con la tecnologÃ­a de Ration.",
          "cta.email": "Correo: <a href=\"mailto:sales@ration.is\">sales@ration.is</a>",
          "cta.button": "Habla con nuestro equipo",
          "about.kicker": "Acerca de",
          "about.title": "Sobre Ration",
          "about.lead": "Mejorar los resultados de la acuicultura moderna combinando profundo conocimiento del sector, tecnologÃ­a robusta y colaboraciones sÃ³lidas con productores.",
          "about.drive.title": "QuÃ© nos impulsa",
          "about.drive.body": "Nuestra misiÃ³n es unificar las fuentes de datos de la acuicultura de forma prÃ¡ctica para que los equipos reduzcan costos y mejoren la consistencia sin aÃ±adir complejidad.",
          "about.exp.title": "Experiencia que importa",
          "about.exp.body": "Durante mÃ¡s de 20 aÃ±os, nuestro equipo ha diseÃ±ado y entregado sistemas de alta tecnologÃ­a para operaciones en tierra en todo el mundo. Esa experiencia, y nuestra colaboraciÃ³n con los clientes, da forma a cÃ³mo diseÃ±amos tecnologÃ­a alineada con lo que realmente necesitan las granjas.",
          "team.bio.hans": "Hans aporta experiencia en visiÃ³n por computadora e IA. Con un doctorado en ingenierÃ­a elÃ©ctrica y de computaciÃ³n enfocado en visiÃ³n por computadora, ha diseÃ±ado sistemas de visiÃ³n de grado industrial robustos para entornos exigentes. Su trabajo une la innovaciÃ³n acadÃ©mica con la ingenierÃ­a prÃ¡ctica y escalable.",
          "team.bio.bjorg": "Bjorg aporta una amplia experiencia en marketing global y estrategia comercial en el sector acuÃ­cola. Ha liderado equipos internacionales, lanzado productos en nuevos mercados, desarrollado estrategias de mercado y promovido el crecimiento comercial.",
          "team.bio.david": "David aporta mÃ¡s de dos dÃ©cadas de experiencia comercial en acuicultura. Durante 24 aÃ±os fue gerente de ventas en Vaki Aquaculture, apoyando a granjas y criaderos a nivel global. Su conocimiento prÃ¡ctico, relaciones en la industria e insight operativo lo convierten en uno de los especialistas comerciales mÃ¡s experimentados del sector. Contacta a David sobre tu proyecto hoy.",
          "team.bio.thorvaldur": "Ãžorvaldur es un pionero en tecnologÃ­a moderna de acuicultura. Como lÃ­der tÃ©cnico en Vaki, aporta dÃ©cadas de experiencia operativa y comercial, visiÃ³n estratÃ©gica y conocimiento del sector.",
          "team.bio.gunnar": "Gunnar es ingeniero elÃ©ctrico con experiencia en sistemas de control y distribuciÃ³n de energÃ­a. Antes de unirse a Ration, trabajÃ³ diseÃ±ando e implementando arquitecturas elÃ©ctricas para entornos industriales. Aporta una base sÃ³lida en diseÃ±o elÃ©ctrico, ingenierÃ­a de confiabilidad e integraciÃ³n de sistemas.",
          "team.bio.elias": "ElÃ­as se especializa en robÃ³tica y mecatrÃ³nica con experiencia en visiÃ³n por computadora, planificaciÃ³n de movimiento y robÃ³tica mÃ©dica. Anteriormente se centrÃ³ en el control de fuerza en instrumentos robÃ³ticos neumÃ¡ticos para cirugÃ­a mÃ­nimamente invasiva, combinando ingenierÃ­a de precisiÃ³n con teorÃ­a de control avanzada.",
          "contact.title": "SÃ© racional con Ration.",
          "form.name": "Nombre *",
          "form.email": "Correo electrÃ³nico *",
          "form.company": "Empresa *",
          "form.country": "PaÃ­s *",
          "form.products": "Â¿En quÃ© productos estÃ¡s interesado?",
          "form.general": "ConversaciÃ³n general",
          "form.additional": "InformaciÃ³n adicional",
          "form.placeholder.name": "Nombre",
          "form.placeholder.email": "Correo electrÃ³nico",
          "form.placeholder.company": "Nombre de la empresa",
          "form.placeholder.country": "Â¿DÃ³nde estÃ¡s?",
          "form.placeholder.notes": "Comentarios o ideas que quieras compartir con nosotros",
          "form.submit": "ContÃ¡ctanos",
          "form.note": "Este formulario abre tu cliente de correo (mailto). SustitÃºyelo por tu backend mÃ¡s adelante si lo deseas.",
          "form.reach": "ContÃ¡ctanos en <a href=\"mailto:info@ration.is\">info@ration.is</a>",
          "footer.about.title": "Sobre Ration",
          "footer.about.body": "Mejorar los resultados de la acuicultura moderna combinando profundo conocimiento del sector, tecnolog&iacute;a robusta y colaboraci&oacute;n cercana con productores, fortaleciendo el bienestar de los peces, reduciendo el desperdicio y apoyando el crecimiento sostenible.",
          "footer.about.cta": "Construyamos una mejor acuicultura juntos.",
          "footer.partnerships.title": "Colaboraci&oacute;n y alianzas",
          "footer.copyright": "&copy; <span id=\"year\"></span> Ration. Todos los derechos reservados.",
        }
      };

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

        document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
          const key = el.getAttribute("data-i18n-placeholder");
          if (!dict[key]) return;
          el.setAttribute("placeholder", dict[key]);
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
  







