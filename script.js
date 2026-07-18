// ==================== СИСТЕМА КУРСОРОВ + ЭФФЕКТЫ КЛИКА ====================
let currentCursorType = localStorage.getItem('cursorType') || 'bear';
document.body.style.cursor = 'default';

const cursor = document.createElement('div');
cursor.id = 'custom-cursor';
document.body.appendChild(cursor);

function setCursor(type) {
  currentCursorType = type;
  localStorage.setItem('cursorType', type);
  updateCursor();
}

function updateCursor() {
  cursor.innerHTML = '';
  cursor.style.width = '36px';
  cursor.style.height = '36px';
  cursor.style.border = 'none';
  cursor.style.background = 'transparent';
  // don't hide the OS cursor — keep it default and only show/hide the custom element

  if (currentCursorType === 'bear') {
    cursor.innerHTML = `<span style="font-size: 32px; filter: drop-shadow(0 0 8px #ff5500);">🐻</span>`;
  } 
  else if (currentCursorType === 'circle') {
    cursor.style.width = '32px';
    cursor.style.height = '32px';
    cursor.style.border = '3px solid #ff5500';
    cursor.style.borderRadius = '50%';
    cursor.style.boxShadow = '0 0 15px #ff5500, 0 0 30px rgba(255,85,0,0.4)';
  } 
  else if (currentCursorType === 'crosshair') {
    cursor.innerHTML = `
      <div style="width: 32px; height: 32px; position: relative;">
        <div style="position: absolute; top: 50%; left: 0; width: 100%; height: 2px; background: #ff5500;"></div>
        <div style="position: absolute; left: 50%; top: 0; width: 2px; height: 100%; background: #ff5500;"></div>
        <div style="position: absolute; top: 50%; left: 50%; width: 8px; height: 8px; background: #ff5500; border-radius: 50%; transform: translate(-50%, -50%);"></div>
      </div>
    `;
  } 
  else {
    // Обычный курсор
    document.body.style.cursor = 'default';
    cursor.style.display = 'none';
    return;
  }

  cursor.style.display = 'flex';
}

// Эффект при клике
function createClickEffect(x, y) {
  const effect = document.createElement('div');
  effect.style.position = 'fixed';
  effect.style.left = x + 'px';
  effect.style.top = y + 'px';
  effect.style.width = '20px';
  effect.style.height = '20px';
  effect.style.border = '2px solid #ff5500';
  effect.style.borderRadius = '50%';
  effect.style.pointerEvents = 'none';
  effect.style.zIndex = '999999';
  effect.style.opacity = '0.8';
  document.body.appendChild(effect);

  effect.animate([
    { transform: 'scale(1)', opacity: 0.8 },
    { transform: 'scale(2.5)', opacity: 0 }
  ], {
    duration: 450,
    easing: 'ease-out'
  }).onfinish = () => effect.remove();
}

// Инициализация
document.addEventListener('mousemove', (e) => {
  if (currentCursorType !== 'default') {
    cursor.style.left = (e.clientX - 18) + 'px';
    cursor.style.top = (e.clientY - 18) + 'px';
  }
});

document.addEventListener('click', (e) => {
  if (currentCursorType !== 'default') {
    createClickEffect(e.clientX, e.clientY);
  }
});

// Увеличиваем курсор при наведении
const interactiveElements = document.querySelectorAll('button, .card, .tab, .medal');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('active'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

updateCursor();
// ==================== ЭФФЕКТ ПУЗЫРЯ ПРИ КЛИКЕ ====================
document.addEventListener('click', function(e) {
  // Не создаём пузырь, если кликнули по кнопке или ссылке (по желанию)
  if (e.target.closest('button, a, .tab, .card')) return;

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  
  // Позиционируем пузырёк точно в место клика
  bubble.style.left = (e.clientX - 11) + 'px';
  bubble.style.top = (e.clientY - 11) + 'px';

  document.body.appendChild(bubble);

  // Удаляем пузырёк после анимации
  setTimeout(() => {
    bubble.remove();
  }, 700);
});
function initTabs() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;

      // Убираем активный класс со всех вкладок и контента
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));

      // Делаем активной нужную вкладку
      tab.classList.add('active');

      const content = document.getElementById(targetTab);
      if (content) {
        content.classList.add('active');
      }

      // Показываем лоадер только на короткое время (опционально)
      loader.style.display = 'flex';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 350); // было 1850 — теперь быстро

      // Дополнительная инициализация для некоторых вкладок
      if (targetTab === 'members') {
        filterAndSort();
      }
      if (targetTab === 'stats') {
        setTimeout(animateStatCounters, 100);
      }
      if (targetTab === 'tankbuilder') {
        setTimeout(initTankBuilder, 100);
      }
    });
  });
}

function tryLogin() {
  const login = document.getElementById('loginInput').value.trim();
  const pass = document.getElementById('passwordInput').value.trim();
  const error = document.getElementById('loginError');
  const loginScreen = document.getElementById('loginScreen');

  const accounts = [
    { login: "evgecshok", password: "Key+4633527" },
    { login: "BaHDuT_c_ALTaYa_", password: "Key+463721" },
    { login: "SurprizZze", password: "Key+4633434" },
    { login: "flamesmurf_TW", password: "Key+463734" },
    { login: "HE_IIpoJIUL", password: "Key+4633332" },
    { login: "HET_ALK0G0LIZMy", password: "Key+4632324" }
  ];

  const user = accounts.find(a => a.login === login && a.password === pass);

  if (user) {
    if (loginScreen) {
      loginScreen.style.display = 'none';
    }
  } else {
    if (error) {
      error.style.display = 'block';
      setTimeout(() => {
        error.style.display = 'none';
      }, 2000);
    }
  }
}

// Функции управления модалкой KIL_6+
function showKIL6PlusModal() {
  const el = document.getElementById('kil6plusModal');
  if (el) el.style.display = 'flex';
}

function closeKIL6PlusModal() {
  const el = document.getElementById('kil6plusModal');
  if (el) el.style.display = 'none';
}

// Дополнительная функция выбора метода оплаты
function selectPaymentMethod(method) {
  if (method === 'FunPay') {
    window.location.href = 'https://funpay.com/lots/offer?id=68277183';
    return;
  }

  if (typeof showToast === 'function') {
    showToast(`${method} — в разработке`, 'error');
  } else {
    alert(method + ' — в разработке');
  }
}

// Войти как гость: скрыть экран логина и перейти на сайт
function enterAsGuest() {
  const loginScreen = document.getElementById('loginScreen');
  if (loginScreen) loginScreen.style.display = 'none';
  // Помечаем, что вошли как гость, чтобы при перезагрузке не показывать экран логина
  try { localStorage.setItem('kil6_guest', '1'); } catch (e) {}
  // Перенаправление на корень сайта (при необходимости изменить URL)
  setTimeout(() => { window.location.href = '/'; }, 120);
}

// Скрываем экран логина при загрузке, если пользователь вошёл как гость
document.addEventListener('DOMContentLoaded', () => {
  try {
    const isGuest = localStorage.getItem('kil6_guest');
    if (isGuest === '1') {
      const loginScreen = document.getElementById('loginScreen');
      if (loginScreen) loginScreen.style.display = 'none';
    }
  } catch (e) {
    // ignore
  }
});
