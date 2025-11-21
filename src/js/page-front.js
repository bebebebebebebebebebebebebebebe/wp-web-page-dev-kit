// モバイルメニューの開閉制御
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const header = document.getElementById('header');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');

  // アイコンの切り替え
  const icon = menuBtn.querySelector('i');
  if (mobileMenu.classList.contains('hidden')) {
    icon.classList.remove('bi-x-lg');
    icon.classList.add('bi-list');
  } else {
    icon.classList.remove('bi-list');
    icon.classList.add('bi-x-lg');
  }
});

// メニューリンクをクリックしたら閉じる
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    const icon = menuBtn.querySelector('i');
    icon.classList.remove('bi-x-lg');
    icon.classList.add('bi-list');
  });
});

// スクロール時のヘッダー制御（影の追加など）
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('shadow-md');
  } else {
    header.classList.remove('shadow-md');
  }
});