document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      toggle.textContent = open ? '×' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }));
  }
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  document.querySelectorAll('.brand-wide').forEach(img => {
    const fallback = img.parentElement.querySelector('.brand-fallback');
    const showFallback = () => { img.style.display = 'none'; if (fallback) fallback.style.display = 'block'; };
    img.addEventListener('error', showFallback);
    if (img.complete && img.naturalWidth === 0) showFallback();
  });

  // Keep the image placeholders visible whenever a supplied asset is missing.
  document.querySelectorAll('.hero-banner > img, .game-art > img, .game-detail-art > img').forEach(img => {
    const placeholder = img.parentElement.querySelector('.banner-placeholder, .game-art-placeholder, .game-detail-placeholder');
    const update = () => { if (placeholder) placeholder.style.display = img.complete && img.naturalWidth > 0 ? 'none' : 'flex'; };
    img.addEventListener('load', update);
    img.addEventListener('error', update);
    update();
  });
});


// Soft scroll reveals. This affects elements as they enter view, not page navigation.
document.addEventListener('DOMContentLoaded', () => {
  const revealTargets = document.querySelectorAll(
    '.section-heading, .game-card, .statement > *, .about-content, .about-rule, .game-description, .site-footer > *'
  );
  revealTargets.forEach(el => el.classList.add('reveal-ready'));

  if (!('IntersectionObserver' in window)) {
    revealTargets.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

  revealTargets.forEach(el => observer.observe(el));
});
