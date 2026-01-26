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
  
