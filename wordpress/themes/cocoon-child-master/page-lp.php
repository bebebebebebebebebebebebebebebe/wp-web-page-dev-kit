<?php
/*
Template Name: LP Custom Template
*/
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php the_title(); ?> | <?php bloginfo('name'); ?></title>

  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
    crossorigin="anonymous" />
  <?php wp_head(); ?>
</head>

<body>
  <div class="progress" aria-hidden="true">
    <span class="progress__bar"></span>
  </div>

  <header class="site-header" data-header>
    <div class="container site-header__inner">
      <a href="#top" class="brand" aria-label="Team Vertex トップへ">
        <span class="brand__mark" aria-hidden="true">V</span>
        <span class="brand__text">Team Vertex</span>
        <span class="brand__sub">IT就労移行支援</span>
      </a>

      <button
        class="nav-toggle"
        data-nav-toggle
        aria-expanded="false"
        aria-controls="global-nav">
        <span class="nav-toggle__bar" aria-hidden="true"></span>
        <span class="sr-only">メニュー</span>
      </button>

      <nav id="global-nav" class="nav" data-nav>
        <ul class="nav__list">
          <li>
            <a href="#programs" class="nav__link icon-link icon-link-hover"><span class="icon-16" aria-hidden="true"><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="bi"
                  viewBox="0 0 16 16">
                  <path
                    d="M0 8a8 8 0 1 0 16 0A8 8 0 0 0 0 8m11.5-3a.5.5 0 0 1 .5.5V6h1a.5.5 0 0 1 0 1h-1v1.5a.5.5 0 0 1-1 0V7H9a.5.5 0 0 1 0-1h1.5V5.5a.5.5 0 0 1 .5-.5" />
                </svg></span>プログラム</a>
          </li>
          <li>
            <a href="#outcomes" class="nav__link icon-link icon-link-hover"><span class="icon-16" aria-hidden="true"><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="bi"
                  viewBox="0 0 16 16">
                  <path d="M0 0h1v15h15v1H0z" />
                  <path
                    d="M2 13h2V7H2zm4 0h2V3H6zm4 0h2V9h-2zm4 0h2V5h-2z" />
                </svg></span>成果</a>
          </li>
          <li>
            <a href="#flow" class="nav__link icon-link icon-link-hover"><span class="icon-16" aria-hidden="true"><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="bi"
                  viewBox="0 0 16 16">
                  <path
                    d="M1 8a2 2 0 1 1 3.999.001A2 2 0 0 1 1 8M11 8a2 2 0 1 1 4 .001A2 2 0 0 1 11 8M6 8a2 2 0 1 1 4 .001A2 2 0 0 1 6 8" />
                </svg></span>利用の流れ</a>
          </li>
          <li>
            <a href="#faq" class="nav__link icon-link icon-link-hover"><span class="icon-16" aria-hidden="true"><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="bi"
                  viewBox="0 0 16 16">
                  <path
                    d="M8 1a7 7 0 1 0 4.95 12.03l2.29.76a.5.5 0 0 0 .64-.64l-.76-2.29A7 7 0 0 0 8 1m.93 9.412-1 .001V9.5h1zm1.812-3.248c-.237.398-.61.67-1.016.97l-.083.063c-.487.36-.731.564-.78.93L8.86 9H7.86l.007-.295c.035-.897.58-1.314 1.04-1.652l.106-.078c.338-.253.585-.438.73-.678a1.2 1.2 0 0 0-.08-1.31C9.41 4.618 8.68 4.5 8.001 4.5c-.6 0-1.18.154-1.62.43l-.2.127-.5-.866.2-.127A3.42 3.42 0 0 1 8 3.5c.93 0 1.77.25 2.31.8.56.56.72 1.36.43 2.114" />
                </svg></span>FAQ</a>
          </li>
        </ul>
        <div class="nav__cta">
          <a
            href="#booking"
            class="btn btn--primary icon-link icon-link-hover">
            見学・相談を予約
            <span class="icon-16" aria-hidden="true">
              <!-- arrow-right -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="bi"
                viewBox="0 0 16 16">
                <path
                  fill-rule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
              </svg>
            </span>
          </a>
        </div>
      </nav>
    </div>
  </header>

  <main id="top">
    <!-- ヒーロー -->
    <section class="hero section" aria-labelledby="hero-title">
      <div class="container hero__grid">
        <div class="hero__copy" aria-describedby="hero-lead hero-points">
          <p class="hero__kicker">IT特化型 就労移行支援</p>
          <h1 id="hero-title" class="hero__title">
            ITで、次の一歩を。<br class="hero__br-md" />
            学習から就職・定着まで一気通貫で伴走。
          </h1>
          <p id="hero-lead" class="hero__lead">
            Team
            Vertexは、エンジニア・デザイナー・IT事務などの職種を見据えた実践型カリキュラムと、企業連携の実務実習で「働ける力」を育てる就労移行支援事業所です。
          </p>

          <div class="hero__cta">
            <a
              href="#booking"
              class="btn btn--primary btn--lg icon-link icon-link-hover"
              data-intent="booking">
              無料見学・個別相談を予約
              <span class="icon-16" aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="bi"
                  viewBox="0 0 16 16">
                  <path
                    fill-rule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                </svg>
              </span>
            </a>
            <a
              href="#materials"
              class="btn btn--ghost btn--lg icon-link"
              data-intent="materials">
              サービス資料をダウンロード
              <span class="icon-16" aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="bi"
                  viewBox="0 0 16 16">
                  <path
                    d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                  <path
                    d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                </svg>
              </span>
            </a>
          </div>
          <p class="hero__microcopy">
            ※ オンライン見学・個別相談に対応しています
          </p>
        </div>

        <figure class="hero__visual" aria-hidden="true">
          <div class="mockup">
            <div class="mockup__header">
              <span></span><span></span><span></span>
            </div>
            <div class="mockup__body">
              <div class="mockup__card"></div>
              <div class="mockup__card"></div>
              <div class="mockup__card mockup__card--wide"></div>
            </div>
          </div>
        </figure>
      </div>
    </section>

    <!-- 導線強化バナー -->
    <aside class="sticky-cta" data-sticky-cta aria-hidden="true">
      <div class="container sticky-cta__inner">
        <p class="sticky-cta__text">個別見学は30分。オンラインも可。</p>
        <a
          href="#booking"
          class="btn btn--primary btn--sm icon-link icon-link-hover">
          今すぐ予約
          <span class="icon-16" aria-hidden="true"><svg
              xmlns="http://www.w3.org/2000/svg"
              class="bi"
              viewBox="0 0 16 16">
              <path
                fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
            </svg></span>
        </a>
      </div>
    </aside>

    <!-- プログラム -->
    <section id="programs" class="section" aria-labelledby="programs-title">
      <div class="container">
        <header class="section__head with-icon-heading">
          <span class="icon-20" aria-hidden="true"><svg
              xmlns="http://www.w3.org/2000/svg"
              class="bi"
              viewBox="0 0 16 16">
              <path
                d="M4 0h8a2 2 0 0 1 2 2v10.5l-3-1.5-3 1.5-3-1.5-3 1.5V2a2 2 0 0 1 2-2" />
            </svg></span>
          <h2 id="programs-title" class="section__title">
            職種別の実践プログラム
          </h2>
        </header>
        <p class="section__lead">
          採用基準と実務課題から逆算した、現場直結のカリキュラム。
        </p>

        <div class="cards" data-reveal>
          <article class="card icon-card">
            <div class="icon-card__icon" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="bi"
                viewBox="0 0 16 16">
                <path
                  d="M3.5 0A1.5 1.5 0 0 0 2 1.5v13A1.5 1.5 0 0 0 3.5 16H11a1 1 0 0 0 1-1V2L9 0zM3.5 1h5.793L11 2.707V15H3.5a.5.5 0 0 1-.5-.5V1.5A.5.5 0 0 1 3.5 1" />
              </svg>
            </div>
            <h3 class="card__title">Webエンジニア</h3>
            <p class="card__body">
              HTML/CSS/JavaScript、Git、API、クラウド基礎。チーム開発でレビュー／Issue運用まで経験。
            </p>
            <a href="#booking" class="card__action icon-link icon-link-hover">このコースで相談
              <span class="icon-14" aria-hidden="true"><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="bi"
                  viewBox="0 0 16 16">
                  <path
                    fill-rule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                </svg></span>
            </a>
          </article>

          <article class="card icon-card">
            <div class="icon-card__icon" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="bi"
                viewBox="0 0 16 16">
                <path d="M0 0h1v15h15v1H0z" />
                <path d="M2 13h2V7H2zm4 0h2V3H6zm4 0h2V9h-2zm4 0h2V5h-2z" />
              </svg>
            </div>
            <h3 class="card__title">データ＆自動化</h3>
            <p class="card__body">
              Python、SQL、データ前処理、可視化、RPA。小規模ETLの設計と運用を実習。
            </p>
            <a href="#booking" class="card__action icon-link icon-link-hover">このコースで相談
              <span class="icon-14" aria-hidden="true"><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="bi"
                  viewBox="0 0 16 16">
                  <path
                    fill-rule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                </svg></span>
            </a>
          </article>

          <article class="card icon-card">
            <div class="icon-card__icon" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="bi"
                viewBox="0 0 16 16">
                <path
                  d="M3 1h10a2 2 0 0 1 2 2v9.5l-3-1.5-3 1.5-3-1.5-3 1.5V3a2 2 0 0 1 2-2" />
              </svg>
            </div>
            <h3 class="card__title">UI/UX・フロント</h3>
            <p class="card__body">
              情報設計、アクセシビリティ、Figmaでのプロトタイピング、ユーザーテストを反復。
            </p>
            <a href="#booking" class="card__action icon-link icon-link-hover">このコースで相談
              <span class="icon-14" aria-hidden="true"><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="bi"
                  viewBox="0 0 16 16">
                  <path
                    fill-rule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                </svg></span>
            </a>
          </article>

          <article class="card icon-card">
            <div class="icon-card__icon" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="bi"
                viewBox="0 0 16 16">
                <path
                  d="M5.5 1a.5.5 0 0 0-.5.5V3h-1A1.5 1.5 0 0 0 2.5 4.5v9A1.5 1.5 0 0 0 4 15h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 12 3h-1V1.5a.5.5 0 0 0-1 0V3H6V1.5a.5.5 0 0 0-.5-.5z" />
              </svg>
            </div>
            <h3 class="card__title">ITサポート</h3>
            <p class="card__body">
              ヘルプデスク基礎、ドキュメント作成、問い合わせ対応ロールプレイ、SLA/優先度判断。
            </p>
            <a href="#booking" class="card__action icon-link icon-link-hover">このコースで相談
              <span class="icon-14" aria-hidden="true"><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="bi"
                  viewBox="0 0 16 16">
                  <path
                    fill-rule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                </svg></span>
            </a>
          </article>
        </div>

        <ul class="badges icon-bullets" data-reveal>
          <li class="badge">
            <span class="icon-12" aria-hidden="true"><svg
                xmlns="http://www.w3.org/2000/svg"
                class="bi"
                viewBox="0 0 16 16">
                <path
                  d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
              </svg></span>個別計画（週次1on1）
          </li>
          <li class="badge">
            <span class="icon-12" aria-hidden="true"><svg
                xmlns="http://www.w3.org/2000/svg"
                class="bi"
                viewBox="0 0 16 16">
                <path
                  d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
              </svg></span>企業実習（最短4週間）
          </li>
          <li class="badge">
            <span class="icon-12" aria-hidden="true"><svg
                xmlns="http://www.w3.org/2000/svg"
                class="bi"
                viewBox="0 0 16 16">
                <path
                  d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
              </svg></span>資格対策（任意）
          </li>
          <li class="badge">
            <span class="icon-12" aria-hidden="true"><svg
                xmlns="http://www.w3.org/2000/svg"
                class="bi"
                viewBox="0 0 16 16">
                <path
                  d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
              </svg></span>就職・定着支援
          </li>
        </ul>
      </div>
    </section>

    <!-- 成果 -->
    <section
      id="outcomes"
      class="section section--alt"
      aria-labelledby="outcomes-title">
      <div class="container">
        <header class="section__head with-icon-heading">
          <span class="icon-20" aria-hidden="true"><svg
              xmlns="http://www.w3.org/2000/svg"
              class="bi"
              viewBox="0 0 16 16">
              <path d="M0 0h1v15h15v1H0z" />
              <path
                d="M2 13h2V7H2zm4 0h2V3H6zm4 0h2V9h-2zm4 0h2V5h-2z" />
            </svg></span>
          <h2 id="outcomes-title" class="section__title">成果と指標</h2>
        </header>
        <p class="section__lead">数字で分かる、就職と定着の実力。</p>

        <dl class="kpis" data-reveal>
          <div class="kpi">
            <dt>就職率</dt>
            <dd>
              <span class="kpi__num" data-countup="86">86</span><span class="kpi__unit">%</span>
            </dd>
          </div>
          <div class="kpi">
            <dt>定着率（12ヶ月）</dt>
            <dd>
              <span class="kpi__num" data-countup="92">92</span><span class="kpi__unit">%</span>
            </dd>
          </div>
          <div class="kpi">
            <dt>平均学習時間／月</dt>
            <dd>
              <span class="kpi__num" data-countup="68">68</span><span class="kpi__unit">h</span>
            </dd>
          </div>
          <div class="kpi">
            <dt>企業実習先</dt>
            <dd>
              <span class="kpi__num" data-countup="35">35</span><span class="kpi__unit">社</span>
            </dd>
          </div>
        </dl>

        <div class="note" role="note">
          数値はダミーです。実サイトでは最新年度の実績を掲載してください。
        </div>
      </div>
    </section>

    <!-- 利用の流れ -->
    <section id="flow" class="section" aria-labelledby="flow-title">
      <div class="container">
        <header class="section__head with-icon-heading">
          <span class="icon-20" aria-hidden="true">
            <!-- calendar-check -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="bi"
              viewBox="0 0 16 16">
              <path
                d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
              <path
                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
            </svg>
          </span>
          <h2 id="flow-title" class="section__title">利用の流れ</h2>
        </header>
        <p class="section__lead">
          初回相談から定着支援まで、専任スタッフが継続的に伴走します。
        </p>

        <ol class="timeline" data-reveal>
          <li class="timeline__item">
            <span class="timeline__step">1</span>
            <h3 class="timeline__title">見学・個別相談</h3>
            <p class="timeline__desc">
              ニーズと配慮事項を確認。通所スケジュールを提案。
            </p>
          </li>
          <li class="timeline__item">
            <span class="timeline__step">2</span>
            <h3 class="timeline__title">体験通所（1〜2週間）</h3>
            <p class="timeline__desc">
              講座体験と面談で適性を可視化。計画書のたたき台を作成。
            </p>
          </li>
          <li class="timeline__item">
            <span class="timeline__step">3</span>
            <h3 class="timeline__title">個別支援計画＆学習開始</h3>
            <p class="timeline__desc">
              週次1on1で学習と体調をモニタリング。必要な配慮を反映。
            </p>
          </li>
          <li class="timeline__item">
            <span class="timeline__step">4</span>
            <h3 class="timeline__title">企業実習</h3>
            <p class="timeline__desc">
              現場課題に取り組み、報連相・品質・スピードを実地で習得。
            </p>
          </li>
          <li class="timeline__item">
            <span class="timeline__step">5</span>
            <h3 class="timeline__title">就職活動</h3>
            <p class="timeline__desc">
              履歴書・ポートフォリオ添削、面接練習、開示文書の準備。
            </p>
          </li>
          <li class="timeline__item">
            <span class="timeline__step">6</span>
            <h3 class="timeline__title">職場定着支援（12ヶ月）</h3>
            <p class="timeline__desc">
              業務整理、環境調整、月次面談で離職リスクを低減。
            </p>
          </li>
        </ol>
      </div>
    </section>

    <!-- 資料DL -->
    <section
      id="materials"
      class="section section--alt"
      aria-labelledby="materials-title">
      <div class="container">
        <header class="section__head with-icon-heading">
          <span class="icon-20" aria-hidden="true"><svg
              xmlns="http://www.w3.org/2000/svg"
              class="bi"
              viewBox="0 0 16 16">
              <path
                d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
              <path
                d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
            </svg></span>
          <h2 id="materials-title" class="section__title">サービス資料</h2>
        </header>
        <p class="section__lead">
          カリキュラム詳細、通所モデル、支援体制、費用の目安を1冊に。
        </p>

        <form class="form" data-reveal novalidate>
          <div class="form__row">
            <label class="form__label" for="m-name">氏名</label>
            <input
              id="m-name"
              name="name"
              class="form__input"
              type="text"
              autocomplete="name"
              required />
          </div>
          <div class="form__row">
            <label class="form__label" for="m-email">メール</label>
            <input
              id="m-email"
              name="email"
              class="form__input"
              type="email"
              autocomplete="email"
              required />
          </div>
          <div class="form__row">
            <label class="form__label" for="m-purpose">ご関心</label>
            <select id="m-purpose" name="purpose" class="form__input">
              <option value="trial">見学・体験を検討</option>
              <option value="course">コース詳細を知りたい</option>
              <option value="company">企業実習/採用の相談</option>
            </select>
          </div>
          <div class="form__actions">
            <button
              type="submit"
              class="btn btn--primary icon-link icon-link-hover"
              data-intent="download">
              資料をメールで受け取る
              <span class="icon-16" aria-hidden="true"><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="bi"
                  viewBox="0 0 16 16">
                  <path
                    d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                  <path
                    d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                </svg></span>
            </button>
          </div>
          <p class="form__note">
            送信でプライバシーポリシーに同意したものとみなされます。
          </p>
        </form>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="section" aria-labelledby="faq-title">
      <div class="container">
        <header class="section__head with-icon-heading">
          <span class="icon-20" aria-hidden="true"><svg
              xmlns="http://www.w3.org/2000/svg"
              class="bi"
              viewBox="0 0 16 16">
              <path
                d="M8 1a7 7 0 1 0 4.95 12.03l2.29.76a.5.5 0 0 0 .64-.64l-.76-2.29A7 7 0 0 0 8 1m.93 9.412-1 .001V9.5h1zm1.812-3.248c-.237.398-.61.67-1.016.97l-.083.063c-.487.36-.731.564-.78.93L8.86 9H7.86l.007-.295c.035-.897.58-1.314 1.04-1.652l.106-.078c.338-.253.585-.438.73-.678a1.2 1.2 0 0 0-.08-1.31C9.41 4.618 8.68 4.5 8.001 4.5c-.6 0-1.18.154-1.62.43l-.2.127-.5-.866.2-.127A3.42 3.42 0 0 1 8 3.5c.93 0 1.77.25 2.31.8.56.56.72 1.36.43 2.114" />
            </svg></span>
          <h2 id="faq-title" class="section__title">よくある質問</h2>
        </header>

        <details class="faq" data-reveal>
          <summary class="faq__q">支援対象はどのような方ですか？</summary>
          <div class="faq__a">
            主治医の意見書等に基づく就労準備支援を必要とされる方で、IT領域での就職を目指す方です。
          </div>
        </details>

        <details class="faq" data-reveal>
          <summary class="faq__q">通所はオンラインでも可能ですか？</summary>
          <div class="faq__a">
            ハイブリッドに対応しています。面談や一部実習は来所が必要な場合があります。
          </div>
        </details>

        <details class="faq" data-reveal>
          <summary class="faq__q">利用料はかかりますか？</summary>
          <div class="faq__a">
            各自治体の負担上限月額の範囲でご利用いただけます。詳細はご相談時にご案内します。
          </div>
        </details>
      </div>
    </section>

    <!-- 予約CTA -->
    <section
      id="booking"
      class="cta section section--cta"
      aria-labelledby="booking-title">
      <div class="container cta__inner">
        <div class="cta__copy">
          <h2 id="booking-title" class="section__title">
            見学・個別相談を予約
          </h2>
          <p class="section__lead">
            ご希望日時をお知らせください。オンライン／来所いずれも対応します。
          </p>
        </div>
        <form class="form form--inline" data-reveal novalidate>
          <label class="sr-only" for="b-name">氏名</label>
          <input
            id="b-name"
            class="form__input"
            type="text"
            placeholder="氏名"
            required />
          <label class="sr-only" for="b-email">メール</label>
          <input
            id="b-email"
            class="form__input"
            type="email"
            placeholder="メール"
            required />
          <label class="sr-only" for="b-date">希望日</label>
          <input id="b-date" class="form__input" type="date" />
          <button
            type="submit"
            class="btn btn--primary icon-link icon-link-hover"
            data-intent="booking-submit">
            予約する
            <span class="icon-16" aria-hidden="true"><svg
                xmlns="http://www.w3.org/2000/svg"
                class="bi"
                viewBox="0 0 16 16">
                <path
                  fill-rule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
              </svg></span>
          </button>
        </form>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container site-footer__grid">
      <div>
        <a href="#top" class="brand brand--footer">
          <span class="brand__mark" aria-hidden="true">V</span>
          <span class="brand__text">Team Vertex</span>
          <span class="brand__sub">IT就労移行支援</span>
        </a>
        <p class="site-footer__copy">
          © 2025 Team Vertex. All rights reserved.
        </p>
      </div>
      <address class="site-footer__addr">
        <span class="icon-14 me-1" aria-hidden="true"><svg
            xmlns="http://www.w3.org/2000/svg"
            class="bi"
            viewBox="0 0 16 16">
            <path
              d="M8 0a5.53 5.53 0 0 0-5.5 5.5c0 4.285 5.5 10.5 5.5 10.5S13.5 9.785 13.5 5.5A5.53 5.53 0 0 0 8 0m0 7.5A2 2 0 1 1 8 3.5a2 2 0 0 1 0 4" />
          </svg></span>
        〒100-0000 東京都千代田区〇〇 1-2-3<br />
        <span class="icon-14 me-1" aria-hidden="true"><svg
            xmlns="http://www.w3.org/2000/svg"
            class="bi"
            viewBox="0 0 16 16">
            <path
              d="M8 3.5a4.5 4.5 0 0 1 4.5 4.5h1A5.5 5.5 0 1 0 8 13.5h.5V12L11 14l-2.5 2v-1.5H8A4.5 4.5 0 0 1 3.5 10h1A3.5 3.5 0 0 0 8 13.5" />
          </svg></span>
        平日 10:00-17:00／土日祝休
      </address>
      <ul class="site-footer__links">
        <li>
          <a href="#materials" class="icon-link icon-link-hover">資料請求<span class="icon-14" aria-hidden="true"><svg
                xmlns="http://www.w3.org/2000/svg"
                class="bi"
                viewBox="0 0 16 16">
                <path
                  fill-rule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
              </svg></span></a>
        </li>
        <li>
          <a href="#faq" class="icon-link icon-link-hover">FAQ<span class="icon-14" aria-hidden="true"><svg
                xmlns="http://www.w3.org/2000/svg"
                class="bi"
                viewBox="0 0 16 16">
                <path
                  fill-rule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
              </svg></span></a>
        </li>
        <li><a href="#" aria-disabled="true">プライバシーポリシー</a></li>
      </ul>
    </div>
  </footer>
  <?php wp_footer(); ?>
  <scripts rc="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
    crossorigin="anonymous"></scripts>
</body>

</html>