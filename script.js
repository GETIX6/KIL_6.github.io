// ==================== МАТЧМЕЙКИНГ (ДАННЫЕ ВНУТРИ ФАЙЛА) ====================

// ====================== РЕДАКТИРУЙ ЗДЕСЬ ======================
const matchData = {
  enemyClan: "[RNDM] RANDOM",
  map: "Рудники",
  scoreLeft: 8,
  scoreRight: 5,
  teamLeft: ["evgecshok", "surprizZze", "flamesmurf_TW", "___BAD__B0Y___", "TauruS_716"],
  teamRight: ["Enemy1", "Enemy2", "Enemy3", "Enemy4"],
  status: "ИДЁТ БОЙ",
  updated: "2026-07-05T11:45:00"
};
// ============================================================

function renderMatch() {
  const content = document.getElementById('matchContent');
  const noMatch = document.getElementById('noMatchMessage');

  if (!matchData) {
    content.style.display = 'none';
    noMatch.style.display = 'block';
    return;
  }

  content.style.display = 'block';
  noMatch.style.display = 'none';

  document.getElementById('match-map-name').textContent = matchData.map.toUpperCase();
  document.getElementById('enemy-clan-name').textContent = matchData.enemyClan;
  document.getElementById('score-left').textContent = matchData.scoreLeft;
  document.getElementById('score-right').textContent = matchData.scoreRight;
  document.getElementById('match-status').textContent = matchData.status || 'ИДЁТ БОЙ';
  document.getElementById('last-updated').textContent = new Date(matchData.updated).toLocaleTimeString('ru-RU');

  document.getElementById('team-left-list').innerHTML = matchData.teamLeft.map(name => 
    `<div style="background:#1a1a20; padding:12px 20px; border-radius:12px; font-size:1.15rem; color:#ff2e2e;">${name}</div>`
  ).join('');

  document.getElementById('team-right-list').innerHTML = matchData.teamRight.map(name => 
    `<div style="background:#1a1a20; padding:12px 20px; border-radius:12px; font-size:1.15rem; color:#00ccff;">${name}</div>`
  ).join('');
}

function initMatchmaking() {
  renderMatch();
}
