/**
 * Page-wide motion that works the same on touch and pointer devices.
 *
 * - [data-split]: a heading's words rise out of a mask, one after another, when it enters the view.
 *   The original text stays the accessible name (aria-label); the word spans are presentational.
 * - [data-parallax="0.08"]: the element drifts along Y relative to the viewport centre while scrolling.
 *   Uses the CSS `translate` property so it composes with any `transform` the element already has.
 *
 * Everything is skipped under prefers-reduced-motion.
 */

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const escapeHtml = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function splitWords(el: HTMLElement): void {
  if (el.dataset.splitDone) return;
  const text = el.textContent?.replace(/\s+/g, ' ').trim() ?? '';
  if (!text) return;
  el.setAttribute('aria-label', text);
  // keep explicit line breaks (<br>) as line boundaries
  const lines = el.innerHTML.split(/<br\s*\/?>/i).map((chunk) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = chunk;
    return (tmp.textContent ?? '').replace(/\s+/g, ' ').trim();
  });
  let n = 0;
  el.innerHTML = lines
    .map((line) =>
      line
        .split(' ')
        .filter(Boolean)
        .map((word) => `<span class="split-mask" aria-hidden="true"><span style="--i:${n++}">${escapeHtml(word)}</span></span>`)
        .join(' '),
    )
    .join('<br>');
  el.dataset.splitDone = '1';
}

function initSplit(): void {
  const els = [...document.querySelectorAll<HTMLElement>('[data-split]')];
  if (!els.length) return;
  els.forEach(splitWords);
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }),
    { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
  );
  els.forEach((el) => io.observe(el));
}

function initParallax(): void {
  if (reduce || !('IntersectionObserver' in window)) return;
  const all = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
  if (!all.length) return;
  const live = new Set<HTMLElement>();
  let ticking = false;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => (e.isIntersecting ? live.add(e.target as HTMLElement) : live.delete(e.target as HTMLElement)));
      onScroll();
    },
    { rootMargin: '20% 0px' },
  );
  all.forEach((el) => io.observe(el));

  function update(): void {
    ticking = false;
    const mid = window.innerHeight / 2;
    live.forEach((el) => {
      const factor = Number(el.dataset.parallax) || 0;
      const r = el.getBoundingClientRect();
      // measure from the untranslated box so the effect does not feed back on itself
      const shift = parseFloat(el.style.translate.split(' ')[1] ?? '0') || 0;
      const offset = r.top - shift + r.height / 2 - mid;
      el.style.translate = `0 ${(-offset * factor).toFixed(1)}px`;
    });
  }
  function onScroll(): void {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
}

initSplit();
initParallax();
