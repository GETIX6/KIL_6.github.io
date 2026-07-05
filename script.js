// ==================== LIVE МАТЧМЕЙКИНГ ====================

let currentLiveMatch = null;

async function loadMatchData() {
  try {
    const res = await fetch('https://raw.githubusercontent.com/getix6/KIL_6.github.io/main/match.json');
    currentLiveMatch = await res.json();
    renderBeautifulMatch();
  } catch (e) {
    console.error(e);
    document.getElementById('noMatchMessage').style.display = 'block';
    document.getElementById('matchContent').style.display = 'none';
  }
}

function renderBeautifulMatch() {
  const content = document.getElementById('matchContent');
  const noMatch = document.getElementById('noMatchMessage');

  if (!currentLiveMatch) {
    content.style.display = 'none';
    noMatch.style.display = 'block';
    return;
  }

  content.style.display = 'block';
  noMatch.style.display = 'none';

  document.getElementById('match-map-name').textContent = currentLiveMatch.map.toUpperCase();
  document.getElementById('enemy-clan-name').textContent = currentLiveMatch.enemyClan;
  document.getElementById('score-left').textContent = currentLiveMatch.scoreLeft;
  document.getElementById('score-right').textContent = currentLiveMatch.scoreRight;
  document.getElementById('match-status').textContent = currentLiveMatch.status || 'ИДЁТ БОЙ';
  document.getElementById('last-updated').textContent = new Date(currentLiveMatch.updated).toLocaleTimeString('ru-RU');

  const leftList = document.getElementById('team-left-list');
  leftList.innerHTML = currentLiveMatch.teamLeft.map(name => 
    `<div style="background:#1a1a20; padding:12px 20px; border-radius:12px; font-size:1.15rem; color:#ff2e2e;">${name}</div>`
  ).join('');

  const rightList = document.getElementById('team-right-list');
  rightList.innerHTML = currentLiveMatch.teamRight.map(name => 
    `<div style="background:#1a1a20; padding:12px 20px; border-radius:12px; font-size:1.15rem; color:#00ccff;">${name}</div>`
  ).join('');
}

function initMatchmaking() {
  loadMatchData();
  setInterval(loadMatchData, 30000);
}
