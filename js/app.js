/* Shared app shell: sidebar + topbar + auth guard */
const PAGES = [
  ['dashboard', '🏠', 'Dashboard'],
  ['recipes', '🍽️', 'Food & Recipes'],
  ['grocery', '🛒', 'Grocery'],
  ['expenses', '💰', 'Expenses'],
  ['expiry', '⏳', 'Expiry Tracking'],
  ['chores', '🧹', 'Chores'],
  ['maintenance', '🔧', 'Maintenance'],
  ['bills', '🧾', 'Bills'],
  ['settings', '⚙️', 'Settings'],
];

function renderShell(active, title, subtitle = '') {
  const user = Api.currentUser();
  if (!user) { location.href = 'index.html'; return null; }

  document.body.innerHTML = `
  <div class="layout">
    <aside class="sidebar">
      <div class="brand">🏠 <span>HomeMate</span></div>
      <nav>${PAGES.map(([id, icon, label]) =>
        `<a href="${id}.html" class="${id === active ? 'active' : ''}">${icon} <span>${label}</span></a>`).join('')}
      </nav>
      <button class="logout" id="logoutBtn">⎋ <span>Logout</span></button>
    </aside>
    <div class="main">
      <div class="topbar">
        <input placeholder="Search anything...">
        <div class="spacer"></div>
        <span>🔔</span>
        <div class="avatar" title="${user.name}">${user.name[0].toUpperCase()}</div>
      </div>
      <div class="content">
        <div class="page-head">
          <div><h1>${title}</h1>${subtitle ? `<small>${subtitle}</small>` : ''}</div>
          <div id="headActions"></div>
        </div>
        <div id="page"></div>
      </div>
    </div>
  </div>`;

  document.getElementById('logoutBtn').onclick = () => { Api.logout(); location.href = 'index.html'; };
  return user;
}

const taka = n => '৳ ' + Number(n).toLocaleString('en-US');
const COLORS = ['#e5484d', '#18a35a', '#1a64e8', '#f08a1c', '#7c5cf0'];

function donut(data) {                      // data = {label: value}
  const total = Object.values(data).reduce((a, b) => a + b, 0) || 1;
  let acc = 0;
  const stops = Object.values(data).map((v, i) => {
    const from = acc / total * 100; acc += v;
    return `${COLORS[i % 5]} ${from}% ${acc / total * 100}%`;
  }).join(',');
  const legend = Object.entries(data).map(([k, v], i) =>
    `<div><span class="dot" style="background:${COLORS[i % 5]}"></span>${k} <b>${Math.round(v / total * 100)}%</b></div>`).join('');
  return `<div class="donut-wrap">
    <div class="donut" style="background:conic-gradient(${stops})">
      <div class="hole"><b>${taka(total)}</b><span>Total</span></div></div>
    <div class="legend">${legend}</div></div>`;
}