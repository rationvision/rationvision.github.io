    (function () {
      const translations = {
        en: {
          "header.tagline": "Vision for Aquaculture",
          "nav.home": "Home",
          "nav.feed": "RationFEED",
          "nav.support": "Service & Support",
          "cta.support": "Email support",
          "cta.sales": "Email sales",
          "hero.kicker": "Service & Support",
          "hero.title": "Sales and service agents",
          "hero.body": "Our experts are known in the industry for designing systems and products that have set new benchmarks for land-based production. Many of the world’s leading farms use technology and solutions created by our team. The experience is real, earned, and shaped by two decades of solving practical problems for fish farmers.",
          "dir.kicker": "Directory",
          "dir.title": "Find a sales and service agent closest to you",
          "country.chile": "Chile",
          "country.iceland": "Iceland &amp; World-wide",
          "country.norway": "Norway",
          "country.uk": "UK",
          "dir.sales": "Sales",
          "dir.serviceAll": "Service for all products",
          "dir.contact": "Contact",
          "dir.contactAll": "Contact for all products",
          "dir.contactFeed": "Contact for all RationFEED",
          "dir.contactOva": "Contact for all RationOVA",
          "dir.contactCounter": "Contact for all RationCOUNTER",
          "dir.note": "If your region is not listed, contact <strong>sales@ration.is</strong> and we will route your request.",
          "footer.tagline": "Aquaculture sensing &amp; control — less waste, cleaner water, better decisions.",
          "footer.contact": "Contact:",
          "footer.copyright": "© <span id=\"year\"></span> Ration. All rights reserved."
        },
        no: {
          "header.tagline": "Visjon for akvakultur",
          "nav.home": "Hjem",
          "nav.feed": "RationFEED",
          "nav.support": "Service og support",
          "cta.support": "E-post til support",
          "cta.sales": "E-post til salg",
          "hero.kicker": "Service og support",
          "hero.title": "Salgs- og serviceagenter",
          "hero.body": "Våre eksperter er kjent i bransjen for å designe systemer og produkter som har satt nye standarder for landbasert produksjon. Mange av verdens ledende anlegg bruker teknologi og løsninger skapt av teamet vårt. Erfaringen er ekte, opparbeidet og formet av to tiår med å løse praktiske problemer for oppdrettere.",
          "dir.kicker": "Oversikt",
          "dir.title": "Finn en salgs- og serviceagent nær deg",
          "country.chile": "Chile",
          "country.iceland": "Island og globalt",
          "country.norway": "Norge",
          "country.uk": "Storbritannia",
          "dir.sales": "Salg",
          "dir.serviceAll": "Service for alle produkter",
          "dir.contact": "Kontakt",
          "dir.contactAll": "Kontakt for alle produkter",
          "dir.contactFeed": "Kontakt for alle RationFEED",
          "dir.contactOva": "Kontakt for alle RationOVA",
          "dir.contactCounter": "Kontakt for alle RationCOUNTER",
          "dir.note": "Hvis regionen din ikke er oppført, kontakt <strong>sales@ration.is</strong> så ruter vi forespørselen din.",
          "footer.tagline": "Akvakulturmåling og -kontroll — mindre avfall, renere vann, bedre beslutninger.",
          "footer.contact": "Kontakt:",
          "footer.copyright": "© <span id=\"year\"></span> Ration. Alle rettigheter reservert."
        },
        es: {
          "header.tagline": "Visión para la acuicultura",
          "nav.home": "Inicio",
          "nav.feed": "RationFEED",
          "nav.support": "Servicio y soporte",
          "cta.support": "Correo a soporte",
          "cta.sales": "Correo a ventas",
          "hero.kicker": "Servicio y soporte",
          "hero.title": "Agentes de ventas y servicio",
          "hero.body": "Nuestros expertos son reconocidos en la industria por diseñar sistemas y productos que han establecido nuevos estándares para la producción en tierra. Muchas de las principales granjas del mundo utilizan tecnología y soluciones creadas por nuestro equipo. La experiencia es real, ganada y formada por dos décadas resolviendo problemas prácticos para los productores.",
          "dir.kicker": "Directorio",
          "dir.title": "Encuentra el agente de ventas y servicio más cercano",
          "country.chile": "Chile",
          "country.iceland": "Islandia y mundial",
          "country.norway": "Noruega",
          "country.uk": "Reino Unido",
          "dir.sales": "Ventas",
          "dir.serviceAll": "Servicio para todos los productos",
          "dir.contact": "Contacto",
          "dir.contactAll": "Contacto para todos los productos",
          "dir.contactFeed": "Contacto para todos los RationFEED",
          "dir.contactOva": "Contacto para todos los RationOVA",
          "dir.contactCounter": "Contacto para todos los RationCOUNTER",
          "dir.note": "Si tu región no aparece en la lista, contacta a <strong>sales@ration.is</strong> y canalizaremos tu solicitud.",
          "footer.tagline": "Sensado y control para acuicultura — menos desperdicio, agua más limpia, mejores decisiones.",
          "footer.contact": "Contacto:",
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
