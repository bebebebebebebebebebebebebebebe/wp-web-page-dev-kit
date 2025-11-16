// page-lp.js
(() => {
  // ========================================
  // Utilities
  // ========================================

  /**
   * DOM要素を取得するヘルパー関数（単一要素）
   * @param {string} sel - CSSセレクタ
   * @param {Element|Document} scope - 検索スコープ（デフォルト: document）
   * @returns {Element|null} マッチした要素、またはnull
   */
  const $ = (sel, scope = document) => scope.querySelector(sel);

  /**
   * DOM要素を取得するヘルパー関数（複数要素）
   * @param {string} sel - CSSセレクタ
   * @param {Element|Document} scope - 検索スコープ（デフォルト: document）
   * @returns {Array<Element>} マッチした要素の配列
   */
  const $$ = (sel, scope = document) => Array.from(scope.querySelectorAll(sel));

  // ========================================
  // Configuration
  // ========================================

  const CONFIG = {
    /** セクション表示のIntersectionObserver閾値 */
    REVEAL_THRESHOLD: 0.15,

    /** カウントアップアニメーションの持続時間（ミリ秒） */
    COUNTUP_DURATION: 800,

    /** カウントアップ開始のIntersectionObserver閾値 */
    COUNTUP_THRESHOLD: 0.4,

    /** フッター回避のIntersectionObserver設定 */
    FOOTER_DODGE_ROOT_MARGIN: '0px 0px -20% 0px',
    FOOTER_DODGE_THRESHOLD: 0.01,

    /** フォーム送信シミュレーションの遅延時間（ミリ秒） */
    FORM_SUBMIT_DELAY: 700,

    /** 電話番号の最小文字数 */
    PHONE_MIN_LENGTH: 10,
  };

  // ========================================
  // Module Functions
  // ========================================

  /**
   * モバイルナビゲーション初期化
   * ハンバーガーメニューの開閉とリンククリック時の自動クローズを管理
   */
  function initMobileNav() {
    const nav = $('[data-nav]');
    const toggle = $('[data-nav-toggle]');

    if (!toggle || !nav) return;

    // トグルボタンのクリックイベント
    toggle.addEventListener('click', () => {
      const open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!open));
      toggle.setAttribute('aria-expanded', String(!open));
    });

    // ナビゲーションリンクのクリックイベント（メニューを自動で閉じる）
    $$('.nav__link', nav).forEach(link => {
      link.addEventListener('click', () => {
        nav.removeAttribute('data-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /**
   * スクロールプログレスバー & スティッキーCTA初期化
   * ページスクロール進捗を表示し、ヒーローセクション通過後にCTAを表示
   */
  function initScrollProgress() {
    const bar = $('.progress__bar');
    const sticky = $('[data-sticky-cta]');
    const hero = $('.hero');

    /**
     * スクロール時のハンドラ関数
     * プログレスバーの幅とスティッキーCTAの表示状態を更新
     */
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);

      // プログレスバーの幅を更新
      if (bar) {
        bar.style.width = `${Math.max(0, Math.min(1, scrolled)) * 100}%`;
      }

      // スティッキーCTAの表示切替（ヒーローセクション通過後に表示）
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
    onScroll(); // 初期状態を設定
  }

  /**
   * スティッキーCTAフッター回避初期化
   * フッターとの重なりを検知してCTAを退避させる
   */
  function initStickyCTA() {
    const footer = $('.site-footer');
    const sticky = $('[data-sticky-cta]');

    if (!('IntersectionObserver' in window) || !footer || !sticky) return;

    const ioFooter = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // CSSが [data-dodge-footer] プレゼンスセレクタのため値付きで付与
            sticky.setAttribute('data-dodge-footer', 'true');
          } else {
            sticky.removeAttribute('data-dodge-footer');
          }
        });
      },
      {
        rootMargin: CONFIG.FOOTER_DODGE_ROOT_MARGIN,
        threshold: CONFIG.FOOTER_DODGE_THRESHOLD
      }
    );

    ioFooter.observe(footer);
  }

  /**
   * セクションリビール初期化
   * IntersectionObserverを使用してスクロール時にセクションを表示
   */
  function initSectionReveal() {
    const revealTargets = $$('[data-reveal]');

    if (!revealTargets.length) return;

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.setAttribute('data-visible', 'true');
              io.unobserve(entry.target); // 一度表示したら監視解除
            }
          });
        },
        { threshold: CONFIG.REVEAL_THRESHOLD }
      );

      revealTargets.forEach(el => io.observe(el));
    } else {
      // フォールバック: IntersectionObserver非対応の場合は即座に表示
      revealTargets.forEach(el => el.setAttribute('data-visible', 'true'));
    }
  }

  /**
   * カウントアップアニメーション初期化
   * KPI数値を0から目標値までアニメーションで表示
   */
  function initCountUp() {
    const nums = $$('[data-countup]');

    /**
     * 要素の数値をアニメーションでカウントアップ
     * @param {Element} el - カウントアップ対象の要素
     */
    const animateCount = (el) => {
      const target = Number(el.getAttribute('data-countup') || '0');
      const dur = CONFIG.COUNTUP_DURATION;
      const t0 = performance.now();

      const tick = (t) => {
        const progress = Math.min(1, (t - t0) / dur);
        el.textContent = Math.round(target * progress).toString();
        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    };

    if (!nums.length) return;

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              io.unobserve(entry.target); // 一度実行したら監視解除
            }
          });
        },
        { threshold: CONFIG.COUNTUP_THRESHOLD }
      );

      nums.forEach(n => io.observe(n));
    }
  }

  /**
   * お問い合わせフォーム初期化
   * 動的フィールド切替とバリデーション機能を提供
   */
  function initContactForm() {
    const contactForm = $('#contact-form');

    if (!contactForm) return;

    const typeSelect = $('#contact-type', contactForm);
    const purposeField = $('#field-purpose');
    const dateField = $('#field-date');

    // ========================================
    // 動的フィールド切替
    // ========================================

    if (typeSelect && purposeField && dateField) {
      typeSelect.addEventListener('change', () => {
        const type = typeSelect.value;

        // 全ての条件付きフィールドを非表示
        purposeField.style.display = 'none';
        dateField.style.display = 'none';

        // 選択に応じてフィールドを表示
        if (type === 'materials') {
          purposeField.style.display = 'grid';
        } else if (type === 'visit') {
          dateField.style.display = 'grid';
        }
      });
    }

    // ========================================
    // バリデーションヘルパー
    // ========================================

    /**
     * エラーメッセージを設定
     * @param {string} inputId - 入力要素のID
     * @param {string} message - エラーメッセージ
     */
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

    /**
     * エラーメッセージをクリア
     * @param {string} inputId - 入力要素のID
     */
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

    /**
     * 全てのエラーメッセージをクリア
     */
    const clearAllErrors = () => {
      ['contact-name', 'contact-email', 'contact-tel', 'contact-type', 'contact-privacy']
        .forEach(clearError);
    };

    // ========================================
    // バリデーション関数
    // ========================================

    /**
     * メールアドレスの形式を検証
     * @param {string} email - メールアドレス
     * @returns {boolean} 有効な場合true
     */
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };

    /**
     * 電話番号の形式を検証（日本の電話番号形式）
     * @param {string} phone - 電話番号
     * @returns {boolean} 有効な場合true
     */
    const validatePhone = (phone) => {
      const re = /^[\d\-\(\)\s]+$/;
      return phone.length >= CONFIG.PHONE_MIN_LENGTH && re.test(phone);
    };

    /**
     * フォーム全体のバリデーション
     * @returns {boolean} 全ての入力が有効な場合true
     */
    const validateForm = () => {
      clearAllErrors();
      let isValid = true;
      let firstErrorField = null;

      // 氏名のバリデーション
      const name = $('#contact-name', contactForm);
      if (!name.value.trim()) {
        setError('contact-name', '氏名を入力してください');
        isValid = false;
        if (!firstErrorField) firstErrorField = name;
      }

      // メールアドレスのバリデーション
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

      // 電話番号のバリデーション
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

      // お問い合わせ種別のバリデーション
      const type = $('#contact-type', contactForm);
      if (!type.value) {
        setError('contact-type', 'お問い合わせ種別を選択してください');
        isValid = false;
        if (!firstErrorField) firstErrorField = type;
      }

      // プライバシーポリシー同意のバリデーション
      const privacy = $('#contact-privacy', contactForm);
      if (!privacy.checked) {
        setError('contact-privacy', '個人情報の取り扱いについてご同意ください');
        isValid = false;
        if (!firstErrorField) firstErrorField = privacy;
      }

      // 最初のエラーフィールドにスクロール
      if (!isValid && firstErrorField) {
        firstErrorField.focus();
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      return isValid;
    };

    // ========================================
    // リアルタイムバリデーション（blur時）
    // ========================================

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

    // ========================================
    // フォーム送信処理
    // ========================================

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

        // デモ用の送信シミュレーション
        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = original;
          alert('送信が完了しました。（デモ）');
          contactForm.reset();
          clearAllErrors();

          // 条件付きフィールドをリセット
          if (purposeField) purposeField.style.display = 'none';
          if (dateField) dateField.style.display = 'none';
        }, CONFIG.FORM_SUBMIT_DELAY);
      }
    });
  }

  /**
   * その他のフォーム処理初期化
   * contact-form以外の全フォームに簡易的な送信処理を適用
   */
  function initOtherForms() {
    const otherForms = $$('form').filter(f => f.id !== 'contact-form');

    otherForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = $('button[type="submit"]', form);
        if (btn) {
          const original = btn.textContent;
          btn.disabled = true;
          btn.textContent = '送信中…';

          // デモ用の送信シミュレーション
          setTimeout(() => {
            btn.disabled = false;
            btn.textContent = original;
            alert('送信が完了しました。（デモ）');
            form.reset();
          }, CONFIG.FORM_SUBMIT_DELAY);
        }
      });
    });
  }

  /**
   * インテント追跡初期化
   * data-intent属性を持つ要素のクリックを追跡
   */
  function initIntentTracking() {
    $$('[data-intent]').forEach(el => {
      el.addEventListener('click', () => {
        const intent = el.getAttribute('data-intent');
        console.log('[intent]', intent);
        // TODO: 実際のアナリティクス送信処理を実装
      });
    });
  }

  // ========================================
  // Application Initialization
  // ========================================

  /**
   * アプリケーション全体の初期化
   * 全てのモジュールを順番に初期化する
   */
  function init() {
    initMobileNav();
    initScrollProgress();
    initStickyCTA();
    initSectionReveal();
    initCountUp();
    initContactForm();
    initOtherForms();
    initIntentTracking();
  }

  // アプリケーション初期化を実行
  init();
})();
