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
      if (!config.hideHomeContactForm) return;

      const contactSection = document.getElementById("contact");
      if (contactSection) contactSection.style.display = "none";

      document.querySelectorAll("a[href='#contact']").forEach((link) => {
        link.style.display = "none";
        link.setAttribute("aria-hidden", "true");
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
          `Interested in: ${interests.length ? interests.join(', ') : '—'}`,
          '',
          'Additional information:',
          notes || '—'
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
          "cta.feed": "View RationFEED",
          "cta.service": "Service & Support",
          "cta.contact": "Contact us",
          "hero.title": "Join our Vision for<br/>Sustainable Aquaculture",
          "hero.body": "Ration develops practical, data-driven technology that helps land-based fish farms operate efficiently, responsibly, and profitably.",
          "hero.cta": "About Ration",
          "value.one.title": "Technology with purpose",
          "value.one.body": "Solutions designed to reduce waste, improve consistency, and integrate seamlessly into your operations.",
          "value.two.title": "Actionable insights",
          "value.two.body": "Clear, usable information that supports better decisions, stronger fish welfare, and improved production economics.",
          "value.three.title": "A long-term partner",
          "value.three.body": "Built on hands-on experience — we work alongside customers to support continuous improvement for a sustainable future.",
          "section.smarter.title": "Smarter Aquaculture starts with Ration",
          "info.one.title": "Our technology improves performance and profitability",
          "info.one.body": "Real-time monitoring via computer vision and sensors that track fish behavior, health indicators, and environmental conditions for better insights.",
          "info.two.title": "Quality control and precision",
          "info.two.body": "A system that provides consistent, verifiable measurements—supporting stable operations and reduced labor.",
          "info.three.title": "Environmental impact",
          "info.three.body": "Lower waste and optimized systems reduce the overall footprint of production and contribute to more sustainable aquaculture.",
          "info.four.title": "Fish welfare",
          "info.four.body": "Our products help maintain better conditions and reduce stress through improved control.",
          "product.feed": "Feed monitoring system<br /><strong>RationFEED</strong>",
          "product.ova": "Counting and quality control of salmon ova<br /><strong>RationOVA</strong>",
          "product.counter": "Counting and biomass estimation of live fish<br /><strong>RationCOUNTER</strong>",
          "product.learn": "Learn more →",
          "cta.title": "Contact our Sales and Service Agents",
          "cta.body": "Let’s get started. Contact your Ration representative today to learn more about optimizing your production efficiency with the power of Ration technology.",
          "cta.button": "Talk to our Team",
          "about.kicker": "About",
          "about.title": "About Ration",
          "about.lead": "To improve modern aquaculture outcomes by combining deep industry knowledge, robust technology, and strong collaborations with producers.",
          "about.drive.title": "What Drives Us",
          "about.drive.body": "Our mission is to unify aquaculture data sources in a practical way—so teams can reduce costs and improve consistency without adding complexity.",
          "about.exp.title": "Experience That Matters",
          "about.exp.body": "For over 20 years, our team has designed and delivered high-tech systems to land-based operations worldwide. This experience, and our collaboration with customers, shapes how we design technology aligned with what farms actually need.",
          "team.bio.hans": "Hans brings expertise in computer vision and AI to the team. With a PhD in Electrical- and Computer Engineering focused computer vision, he has designed industrial-grade vision systems robust for demanding environments. His work bridges academic innovation with practical, scalable engineering.",
          "team.bio.bjorg": "Bjorg brings extensive experience in global marketing and commercial strategy across the aquaculture sector. She has led international teams, launched products into new markets, developed market strategies, and driven commercial growth.",
          "team.bio.david": "David brings more than two decades of commercial aquaculture experience. For 24 years, he served as sales manager at Vaki Aquaculture, supporting farms and hatcheries globally. His hands-on knowledge, industry relationships, and operational insight make him one of the sector's most experienced commercial specialists. Contact David about your project today.",
          "team.bio.thorvaldur": "Þorvaldur is a pioneer in modern aquaculture technology. As a Technical Lead in Vaki, he has decades of operational and commercial experience, strategic insight, and sector knowledge, which he brings to the team.",
          "team.bio.gunnar": "Gunnar is an electrical engineer, with experience in control systems and power distribution. Before joining Ration, he worked at designing and implementing electrical architectures for industrial environments. He contributes a strong foundation in electrical design, reliability engineering, and system integration.",
          "team.bio.elias": "Elías specializes in robotics and mechatronics with experience across computer vision, motion planning, and medical robotics. Previously, focused on force control in pneumatic robotic instruments for minimally invasive surgery, blending precision engineering with advanced control theory.",
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
          "footer.tagline": "Aquaculture sensing &amp; control — less waste, cleaner water, better decisions.",
          "footer.contact": "Contact:",
          "footer.service": "Service:",
          "footer.partnerships": "Partnerships:",
          "footer.copyright": "© <span id=\"year\"></span> Ration. All rights reserved."
        },
        no: {
          "header.tagline": "Visjon for akvakultur",
          "nav.products": "Se produkter",
          "nav.about": "Om oss",
          "nav.contact": "Kontakt",
          "cta.feed": "Se RationFEED",
          "cta.service": "Service og support",
          "cta.contact": "Kontakt oss",
          "hero.title": "Bli med på vår visjon for<br/>bærekraftig akvakultur",
          "hero.body": "Ration utvikler praktisk, datadrevet teknologi som hjelper landbaserte oppdrettsanlegg med å drive mer effektivt, ansvarlig og lønnsomt.",
          "hero.cta": "Om Ration",
          "value.one.title": "Teknologi med formål",
          "value.one.body": "Løsninger utformet for å redusere svinn, forbedre konsistens og integrere sømløst i driften.",
          "value.two.title": "Handlingsrettet innsikt",
          "value.two.body": "Klar og brukbar informasjon som støtter bedre beslutninger, bedre fiskevelferd og bedre produksjonsøkonomi.",
          "value.three.title": "En langsiktig partner",
          "value.three.body": "Bygget på praktisk erfaring — vi jobber side om side med kunder for kontinuerlig forbedring og en bærekraftig fremtid.",
          "section.smarter.title": "Smartere akvakultur starter med Ration",
          "info.one.title": "Vår teknologi forbedrer ytelse og lønnsomhet",
          "info.one.body": "Sanntidsovervåking via datavisjon og sensorer som sporer fiskens atferd, helseindikatorer og miljøforhold for bedre innsikt.",
          "info.two.title": "Kvalitetskontroll og presisjon",
          "info.two.body": "Et system som gir konsistente, verifiserbare målinger — som støtter stabil drift og redusert arbeidsbelastning.",
          "info.three.title": "Miljøpåvirkning",
          "info.three.body": "Mindre avfall og optimaliserte systemer reduserer det totale fotavtrykket og bidrar til mer bærekraftig akvakultur.",
          "info.four.title": "Fiskevelferd",
          "info.four.body": "Våre produkter hjelper med å opprettholde bedre forhold og redusere stress gjennom bedre kontroll.",
          "product.feed": "Fôrovervåkingssystem<br /><strong>RationFEED</strong>",
          "product.ova": "Telling og kvalitetskontroll av lakserogn<br /><strong>RationOVA</strong>",
          "product.counter": "Telling og biomasseestimering av levende fisk<br /><strong>RationCOUNTER</strong>",
          "product.learn": "Les mer →",
          "cta.title": "Kontakt våre salgs- og serviceagenter",
          "cta.body": "La oss komme i gang. Kontakt din Ration-representant i dag for å lære mer om hvordan du kan optimalisere produksjonen med Ration-teknologi.",
          "cta.button": "Snakk med teamet vårt",
          "about.kicker": "Om",
          "about.title": "Om Ration",
          "about.lead": "Å forbedre resultater i moderne akvakultur ved å kombinere dyp bransjekunnskap, robust teknologi og sterke samarbeid med produsenter.",
          "about.drive.title": "Hva som driver oss",
          "about.drive.body": "Vår misjon er å samle akvakulturdata på en praktisk måte — slik at team kan redusere kostnader og forbedre konsistens uten ekstra kompleksitet.",
          "about.exp.title": "Erfaring som betyr noe",
          "about.exp.body": "I over 20 år har teamet vårt designet og levert høyteknologiske systemer til landbaserte anlegg over hele verden. Denne erfaringen, og samarbeidet med kundene, former hvordan vi designer teknologi i tråd med det oppdrettsanlegg faktisk trenger.",
          "team.bio.hans": "Hans har ekspertise innen datavisjon og AI. Med en doktorgrad i elektro- og datateknikk med fokus på datavisjon har han designet industrikvalitets visjonssystemer robuste for krevende miljøer. Arbeidet hans bygger bro mellom akademisk innovasjon og praktisk, skalerbar ingeniørkunst.",
          "team.bio.bjorg": "Bjorg har omfattende erfaring innen global markedsføring og kommersiell strategi i akvakultursektoren. Hun har ledet internasjonale team, lansert produkter i nye markeder, utviklet markedsstrategier og drevet kommersiell vekst.",
          "team.bio.david": "David har over to tiår med kommersiell erfaring i akvakultur. I 24 år var han salgsleder i Vaki Aquaculture og støttet oppdrettsanlegg globalt. Hans praktiske kunnskap, bransjerelasjoner og operasjonelle innsikt gjør ham til en av sektorens mest erfarne kommersielle spesialister. Kontakt David om prosjektet ditt i dag.",
          "team.bio.thorvaldur": "Þorvaldur er en pioner innen moderne akvakulturteknologi. Som teknisk leder i Vaki har han tiår med operasjonell og kommersiell erfaring, strategisk innsikt og sektorkunnskap som han tar med inn i teamet.",
          "team.bio.gunnar": "Gunnar er elektroingeniør med erfaring innen styringssystemer og kraftdistribusjon. Før han begynte i Ration jobbet han med å designe og implementere elektriske arkitekturer for industrielle miljøer. Han bidrar med et sterkt grunnlag innen elektrisk design, pålitelighetsingeniørfag og systemintegrasjon.",
          "team.bio.elias": "Elías spesialiserer seg i robotikk og mekatronikk med erfaring innen datavisjon, bevegelsesplanlegging og medisinsk robotikk. Tidligere jobbet han med kraftkontroll i pneumatiske robotinstrumenter for minimalt invasiv kirurgi, og kombinerer presisjonsingeniørkunst med avansert reguleringsteori.",
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
          "form.note": "Dette skjemaet åpner e-postklienten din (mailto). Bytt til backend senere om ønskelig.",
          "form.reach": "Kontakt oss på <a href=\"mailto:info@ration.is\">info@ration.is</a>",
          "footer.tagline": "Akvakulturmåling og -kontroll — mindre avfall, renere vann, bedre beslutninger.",
          "footer.contact": "Kontakt:",
          "footer.service": "Service:",
          "footer.partnerships": "Partnerskap:",
          "footer.copyright": "© <span id=\"year\"></span> Ration. Alle rettigheter reservert."
        },
        es: {
          "header.tagline": "Visión para la acuicultura",
          "nav.products": "Ver productos",
          "nav.about": "Sobre nosotros",
          "nav.contact": "Contacto",
          "cta.feed": "Ver RationFEED",
          "cta.service": "Servicio y soporte",
          "cta.contact": "Contáctanos",
          "hero.title": "Únete a nuestra visión de<br/>acuicultura sostenible",
          "hero.body": "Ration desarrolla tecnología práctica y basada en datos que ayuda a las granjas acuícolas en tierra a operar de forma más eficiente, responsable y rentable.",
          "hero.cta": "Sobre Ration",
          "value.one.title": "Tecnología con propósito",
          "value.one.body": "Soluciones diseñadas para reducir el desperdicio, mejorar la consistencia e integrarse sin fricciones en tus operaciones.",
          "value.two.title": "Información accionable",
          "value.two.body": "Información clara y utilizable que respalda mejores decisiones, mayor bienestar de los peces y mejores resultados económicos.",
          "value.three.title": "Un socio a largo plazo",
          "value.three.body": "Basado en experiencia práctica — trabajamos junto a los clientes para la mejora continua y un futuro sostenible.",
          "section.smarter.title": "Una acuicultura más inteligente comienza con Ration",
          "info.one.title": "Nuestra tecnología mejora el rendimiento y la rentabilidad",
          "info.one.body": "Monitoreo en tiempo real mediante visión por computadora y sensores que siguen el comportamiento de los peces, indicadores de salud y condiciones ambientales para obtener mejores insights.",
          "info.two.title": "Control de calidad y precisión",
          "info.two.body": "Un sistema que ofrece mediciones consistentes y verificables — apoyando operaciones estables y menos trabajo manual.",
          "info.three.title": "Impacto ambiental",
          "info.three.body": "Menos desperdicio y sistemas optimizados reducen la huella total de producción y contribuyen a una acuicultura más sostenible.",
          "info.four.title": "Bienestar de los peces",
          "info.four.body": "Nuestros productos ayudan a mantener mejores condiciones y reducir el estrés mediante un control mejorado.",
          "product.feed": "Sistema de monitoreo de alimento<br /><strong>RationFEED</strong>",
          "product.ova": "Conteo y control de calidad de ovas de salmón<br /><strong>RationOVA</strong>",
          "product.counter": "Conteo y estimación de biomasa de peces vivos<br /><strong>RationCOUNTER</strong>",
          "product.learn": "Más información →",
          "cta.title": "Contacta a nuestros agentes de ventas y servicio",
          "cta.body": "Empecemos. Contacta hoy a tu representante de Ration para conocer cómo optimizar tu eficiencia de producción con la tecnología de Ration.",
          "cta.button": "Habla con nuestro equipo",
          "about.kicker": "Acerca de",
          "about.title": "Sobre Ration",
          "about.lead": "Mejorar los resultados de la acuicultura moderna combinando profundo conocimiento del sector, tecnología robusta y colaboraciones sólidas con productores.",
          "about.drive.title": "Qué nos impulsa",
          "about.drive.body": "Nuestra misión es unificar las fuentes de datos de la acuicultura de forma práctica para que los equipos reduzcan costos y mejoren la consistencia sin añadir complejidad.",
          "about.exp.title": "Experiencia que importa",
          "about.exp.body": "Durante más de 20 años, nuestro equipo ha diseñado y entregado sistemas de alta tecnología para operaciones en tierra en todo el mundo. Esa experiencia, y nuestra colaboración con los clientes, da forma a cómo diseñamos tecnología alineada con lo que realmente necesitan las granjas.",
          "team.bio.hans": "Hans aporta experiencia en visión por computadora e IA. Con un doctorado en ingeniería eléctrica y de computación enfocado en visión por computadora, ha diseñado sistemas de visión de grado industrial robustos para entornos exigentes. Su trabajo une la innovación académica con la ingeniería práctica y escalable.",
          "team.bio.bjorg": "Bjorg aporta una amplia experiencia en marketing global y estrategia comercial en el sector acuícola. Ha liderado equipos internacionales, lanzado productos en nuevos mercados, desarrollado estrategias de mercado y promovido el crecimiento comercial.",
          "team.bio.david": "David aporta más de dos décadas de experiencia comercial en acuicultura. Durante 24 años fue gerente de ventas en Vaki Aquaculture, apoyando a granjas y criaderos a nivel global. Su conocimiento práctico, relaciones en la industria e insight operativo lo convierten en uno de los especialistas comerciales más experimentados del sector. Contacta a David sobre tu proyecto hoy.",
          "team.bio.thorvaldur": "Þorvaldur es un pionero en tecnología moderna de acuicultura. Como líder técnico en Vaki, aporta décadas de experiencia operativa y comercial, visión estratégica y conocimiento del sector.",
          "team.bio.gunnar": "Gunnar es ingeniero eléctrico con experiencia en sistemas de control y distribución de energía. Antes de unirse a Ration, trabajó diseñando e implementando arquitecturas eléctricas para entornos industriales. Aporta una base sólida en diseño eléctrico, ingeniería de confiabilidad e integración de sistemas.",
          "team.bio.elias": "Elías se especializa en robótica y mecatrónica con experiencia en visión por computadora, planificación de movimiento y robótica médica. Anteriormente se centró en el control de fuerza en instrumentos robóticos neumáticos para cirugía mínimamente invasiva, combinando ingeniería de precisión con teoría de control avanzada.",
          "contact.title": "Sé racional con Ration.",
          "form.name": "Nombre *",
          "form.email": "Correo electrónico *",
          "form.company": "Empresa *",
          "form.country": "País *",
          "form.products": "¿En qué productos estás interesado?",
          "form.general": "Conversación general",
          "form.additional": "Información adicional",
          "form.placeholder.name": "Nombre",
          "form.placeholder.email": "Correo electrónico",
          "form.placeholder.company": "Nombre de la empresa",
          "form.placeholder.country": "¿Dónde estás?",
          "form.placeholder.notes": "Comentarios o ideas que quieras compartir con nosotros",
          "form.submit": "Contáctanos",
          "form.note": "Este formulario abre tu cliente de correo (mailto). Sustitúyelo por tu backend más adelante si lo deseas.",
          "form.reach": "Contáctanos en <a href=\"mailto:info@ration.is\">info@ration.is</a>",
          "footer.tagline": "Sensado y control para acuicultura — menos desperdicio, agua más limpia, mejores decisiones.",
          "footer.contact": "Contacto:",
          "footer.service": "Servicio:",
          "footer.partnerships": "Colaboraciones:",
          "footer.copyright": "© <span id=\"year\"></span> Ration. Todos los derechos reservados."
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
  
