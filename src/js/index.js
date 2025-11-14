// main.js
(() => {
  const $ = (sel, scope = document) => scope.querySelector(sel);
  const $$ = (sel, scope = document) => Array.from(scope.querySelectorAll(sel));

  // =========
  // Mobile Nav
  // =========
  const nav = $('[data-nav]');
  const toggle = $('[data-nav-toggle]');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!open));
      toggle.setAttribute('aria-expanded', String(!open));
    });
    $$('.nav__link', nav).forEach(a => a.addEventListener('click', () => {
      nav.removeAttribute('data-open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // =========
  // Scroll Progress + Sticky CTA（ヒーロー通過で表示）
  // =========
  const bar = $('.progress__bar');
  const sticky = $('[data-sticky-cta]');
  const hero = $('.hero');
  const onScroll = () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
    if (bar) bar.style.width = `${Math.max(0, Math.min(1, scrolled)) * 100}%`;
    if (sticky && hero) {
      const heroBottom = hero.getBoundingClientRect().bottom;
      if (heroBottom < 0) {
        sticky.setAttribute('data-active', 'true');
        sticky.setAttribute('aria-hidden', 'false');
      } else {
        sticky.removeAttribute('data-active');
        sticky.setAttribute('aria-hidden', 'true');
      }
    }
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // =========
  // Sticky CTA がフッターを隠さないように退避
  // =========
  const footer = $('.site-footer');

  if ('IntersectionObserver' in window && footer && sticky) {
    const ioFooter = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            // CSSが [data-dodge-footer] プレゼンスセレクタのため値付きで付与
            sticky.setAttribute('data-dodge-footer', 'true');
          } else {
            sticky.removeAttribute('data-dodge-footer');
          }
        });
      },
      { rootMargin: '0px 0px -20% 0px', threshold: 0.01 }
    );
    ioFooter.observe(footer);
  }

  // =========
  // Section Reveal (IntersectionObserver)
  // =========
  const revealTargets = $$('[data-reveal]');
  if ('IntersectionObserver' in window && revealTargets.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.setAttribute('data-visible', 'true');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.setAttribute('data-visible', 'true'));
  }

  // =========
  // Count-up KPIs when visible
  // =========
  const nums = $$('[data-countup]');
  const animateCount = (el) => {
    const target = Number(el.getAttribute('data-countup') || '0');
    const dur = 800;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(target * p).toString();
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window && nums.length) {
    const io2 = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCount(e.target);
          io2.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    nums.forEach(n => io2.observe(n));
  }

  // =========
  // Lightweight form handling (demo)
  // =========
  const forms = $$('form');
  forms.forEach(f => {
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = $('button[type="submit"]', f);
      if (btn) {
        const original = btn.textContent;
        btn.disabled = true;
        btn.textContent = '送信中…';
        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = original;
          alert('送信が完了しました。（デモ）');
          f.reset();
        }, 700);
      }
    });
  });

  // =========
  // Intent tracking（クリックされる要素のみ）
  // =========
  $$('[data-intent]').forEach(el => {
    el.addEventListener('click', () => {
      const intent = el.getAttribute('data-intent');
      console.log('[intent]', intent);
    });
  });
})();
