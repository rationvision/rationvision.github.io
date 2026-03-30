(function () {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navList = document.querySelector('[data-nav-list]');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close the menu when a link is clicked (mobile)
    navList.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.tagName === 'A') {
        navList.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        navList.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Scrollspy: highlight current section in the nav
  const sectionLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
  const sections = sectionLinks
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const setActive = () => {
    const y = window.scrollY + 120;
    let current = null;
    for (const sec of sections) {
      if (sec.offsetTop <= y) current = sec;
    }
    sectionLinks.forEach((a) => a.removeAttribute('aria-current'));
    if (current) {
      const active = sectionLinks.find((a) => a.getAttribute('href') === '#' + current.id);
      if (active) active.setAttribute('aria-current', 'page');
    }
  };

  window.addEventListener('scroll', setActive, { passive: true });
  window.addEventListener('load', setActive);
})();
