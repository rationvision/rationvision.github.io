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
  
