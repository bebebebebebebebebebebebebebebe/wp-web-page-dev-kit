// page-lp.js
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
  // Contact Form - Dynamic Fields & Validation
  // =========
  const contactForm = $('#contact-form');

  if (contactForm) {
    const typeSelect = $('#contact-type', contactForm);
    const purposeField = $('#field-purpose');
    const dateField = $('#field-date');

    // Dynamic field toggling based on contact type
    if (typeSelect && purposeField && dateField) {
      typeSelect.addEventListener('change', () => {
        const type = typeSelect.value;

        // Hide all conditional fields first
        purposeField.style.display = 'none';
        dateField.style.display = 'none';

        // Show relevant field based on selection
        if (type === 'materials') {
          purposeField.style.display = 'grid';
        } else if (type === 'visit') {
          dateField.style.display = 'grid';
        }
      });
    }

    // Validation helpers
    const setError = (inputId, message) => {
      const input = $(`#${inputId}`, contactForm);
      const errorSpan = $(`#${inputId}-error`, contactForm);
      if (input) {
        input.setAttribute('aria-invalid', 'true');
        input.classList.add('error');
      }
      if (errorSpan) {
        errorSpan.textContent = message;
      }
    };

    const clearError = (inputId) => {
      const input = $(`#${inputId}`, contactForm);
      const errorSpan = $(`#${inputId}-error`, contactForm);
      if (input) {
        input.removeAttribute('aria-invalid');
        input.classList.remove('error');
      }
      if (errorSpan) {
        errorSpan.textContent = '';
      }
    };

    const clearAllErrors = () => {
      ['contact-name', 'contact-email', 'contact-tel', 'contact-type', 'contact-privacy']
        .forEach(clearError);
    };

    // Validation functions
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };

    const validatePhone = (phone) => {
      // Allow Japanese phone formats: 090-1234-5678, 03-1234-5678, etc.
      const re = /^[\d\-\(\)\s]+$/;
      return phone.length >= 10 && re.test(phone);
    };

    const validateForm = () => {
      clearAllErrors();
      let isValid = true;
      let firstErrorField = null;

      // Name validation
      const name = $('#contact-name', contactForm);
      if (!name.value.trim()) {
        setError('contact-name', '氏名を入力してください');
        isValid = false;
        if (!firstErrorField) firstErrorField = name;
      }

      // Email validation
      const email = $('#contact-email', contactForm);
      if (!email.value.trim()) {
        setError('contact-email', 'メールアドレスを入力してください');
        isValid = false;
        if (!firstErrorField) firstErrorField = email;
      } else if (!validateEmail(email.value.trim())) {
        setError('contact-email', '有効なメールアドレスを入力してください');
        isValid = false;
        if (!firstErrorField) firstErrorField = email;
      }

      // Phone validation
      const tel = $('#contact-tel', contactForm);
      if (!tel.value.trim()) {
        setError('contact-tel', '電話番号を入力してください');
        isValid = false;
        if (!firstErrorField) firstErrorField = tel;
      } else if (!validatePhone(tel.value.trim())) {
        setError('contact-tel', '有効な電話番号を入力してください');
        isValid = false;
        if (!firstErrorField) firstErrorField = tel;
      }

      // Contact type validation
      const type = $('#contact-type', contactForm);
      if (!type.value) {
        setError('contact-type', 'お問い合わせ種別を選択してください');
        isValid = false;
        if (!firstErrorField) firstErrorField = type;
      }

      // Privacy checkbox validation
      const privacy = $('#contact-privacy', contactForm);
      if (!privacy.checked) {
        setError('contact-privacy', '個人情報の取り扱いについてご同意ください');
        isValid = false;
        if (!firstErrorField) firstErrorField = privacy;
      }

      // Scroll to first error
      if (!isValid && firstErrorField) {
        firstErrorField.focus();
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      return isValid;
    };

    // Real-time validation on blur
    ['contact-name', 'contact-email', 'contact-tel', 'contact-type'].forEach(id => {
      const input = $(`#${id}`, contactForm);
      if (input) {
        input.addEventListener('blur', () => {
          if (input.value.trim()) {
            clearError(id);
          }
        });
      }
    });

    // Form submission
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      const btn = $('button[type="submit"]', contactForm);
      if (btn) {
        const original = btn.textContent;
        btn.disabled = true;
        btn.textContent = '送信中…';

        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = original;
          alert('送信が完了しました。（デモ）');
          contactForm.reset();
          clearAllErrors();
          // Reset conditional fields
          if (purposeField) purposeField.style.display = 'none';
          if (dateField) dateField.style.display = 'none';
        }, 700);
      }
    });
  }

  // =========
  // Lightweight form handling for other forms (demo)
  // =========
  const otherForms = $$('form').filter(f => f.id !== 'contact-form');
  otherForms.forEach(f => {
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
