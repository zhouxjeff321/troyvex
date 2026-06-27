/* Shared event data + list/calendar renderers for all 5 event-page mockups.
   Each mockup supplies #ev-list, #cal (with .cal-title/.cal-grid/[data-prev]/[data-next])
   and styles the generic class names itself. */
const EVENTS = [
  { y:2026, m:4,  d:21, name:'VEX World Championship',        loc:'St. Louis, Missouri', detail:'World stage · April 21–24',                 tag:'Worlds',     kind:'major' },
  { y:2026, m:2,  d:27, name:'California State Championship',  loc:'Los Angeles, CA',     detail:'Qualified teams advance',                  tag:'States',     kind:'plain' },
  { y:2026, m:2,  d:13, name:'NorCal Signature Event',        loc:'Silicon Valley, CA',  detail:'Teams B · C · D · E · X',                  tag:'Signature',  kind:'plain' },
  { y:2026, m:1,  d:25, name:'JROTC National Championship',   loc:'Sandusky, Ohio',      detail:'Team Y — National Champion',               tag:'Champion',   kind:'win'   },
  { y:2026, m:1,  d:23, name:'Kalahari Signature Event',      loc:'Sandusky, Ohio',      detail:'Robot Skills Champion',                    tag:'Signature',  kind:'plain' },
  { y:2025, m:12, d:30, name:'Diamond in the Desert',         loc:'Arizona',             detail:'Team Y — Tournament & Robot Skills Champion', tag:'Champion', kind:'win'  },
  { y:2025, m:11, d:15, name:'Beach Brawl @ McBride',         loc:'Long Beach, CA',      detail:'Team Y — Excellence · Team C — Innovate',  tag:'Excellence', kind:'win'   },
  { y:2025, m:11, d:12, name:'One World @ UC Berkeley',       loc:'Berkeley, CA',        detail:'Team Y — Tournament Finalists',            tag:'Finalist',   kind:'plain' },
];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MO3 = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
const SEASON = [{y:2025,m:11},{y:2025,m:12},{y:2026,m:1},{y:2026,m:2},{y:2026,m:3},{y:2026,m:4}];
let calIdx = 2; // default to January 2026 (busiest month)

function renderList(el){
  if(!el) return;
  el.innerHTML = EVENTS.map(e => `
    <a class="ev ev-${e.kind}">
      <div class="ev-date">
        <span class="ev-mo">${MO3[e.m-1]}</span>
        <span class="ev-day">${e.d}</span>
        <span class="ev-yr">${e.y}</span>
      </div>
      <div class="ev-main">
        <h3 class="ev-name">${e.name}</h3>
        <div class="ev-loc">${e.loc}</div>
        <div class="ev-detail">${e.detail}</div>
      </div>
      ${e.tag ? `<span class="ev-tag">${e.tag}</span>` : ''}
    </a>`).join('');
}

function renderCal(host){
  if(!host) return;
  const cur = SEASON[calIdx];
  host.querySelector('.cal-title').textContent = MONTHS[cur.m-1] + ' ' + cur.y;
  const first = new Date(cur.y, cur.m-1, 1).getDay();
  const days  = new Date(cur.y, cur.m, 0).getDate();
  let cells = '';
  ['S','M','T','W','T','F','S'].forEach(d => cells += `<div class="cal-dow">${d}</div>`);
  for(let i=0;i<first;i++) cells += `<div class="cal-cell cal-empty"></div>`;
  for(let day=1; day<=days; day++){
    const evs = EVENTS.filter(e => e.y===cur.y && e.m===cur.m && e.d===day);
    cells += `<div class="cal-cell${evs.length?' cal-has':''}">
      <span class="cal-num">${day}</span>
      ${evs.map(e => `<span class="cal-ev ev-${e.kind}" title="${e.name}">${e.name}</span>`).join('')}
    </div>`;
  }
  host.querySelector('.cal-grid').innerHTML = cells;
  host.querySelector('[data-prev]').disabled = calIdx===0;
  host.querySelector('[data-next]').disabled = calIdx===SEASON.length-1;
}

function initEvents(){
  renderList(document.querySelector('#ev-list'));
  const host = document.querySelector('#cal');
  if(host){
    host.querySelector('[data-prev]').onclick = () => { if(calIdx>0){ calIdx--; renderCal(host); } };
    host.querySelector('[data-next]').onclick = () => { if(calIdx<SEASON.length-1){ calIdx++; renderCal(host); } };
    renderCal(host);
  }
  document.querySelectorAll('[data-scroll-cal]').forEach(b =>
    b.onclick = (ev) => { ev.preventDefault(); document.querySelector('#cal-view').scrollIntoView({behavior:'smooth'}); });
}
document.addEventListener('DOMContentLoaded', initEvents);
