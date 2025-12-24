const state = {
  page: "game",
  index: null,
  season: null,
  game: null,
  allTime: false,
  vsOpponentSlug: null,
  gameType: "REG",
};

async function loadJSON(path){
  const res = await fetch(path, { cache: "no-store" });
  if(!res.ok) throw new Error(`failed to load ${path}`);
  return await res.json();
}
const GAME_VIDEOS = {
  /* =======================
     SEASON 5 (games 1–14)
     ======================= */

  "5_1":  { highlights: "https://youtu.be/BIdXtHM2480?si=-hOTG64ZkbozNfLX", full: "" },
  "5_2":  { highlights: "https://youtu.be/FjDE8xwJteY?si=j6K5_x7u-Yvg1_1H", full: "" },
  "5_3":  { highlights: "https://youtu.be/vbBxZq8bqyk?si=jejX4zgE1V57Hy4f", full: "" },
  "5_4":  { highlights: "https://youtu.be/P00CEBaoAaw?si=bQeRkRi3SQCaC-VA", full: "" },
  "5_5":  { highlights: "https://youtu.be/vuwG-7CQwws?si=DsUTAa0iplVwMay0", full: "" },
  "5_6":  { highlights: "https://youtu.be/umgJuDjYIHk?si=5BLtORoVQZ_OSRc-", full: "" },
  "5_7":  { highlights: "https://youtu.be/xjXkkyxE7Eo?si=_r_YKQxZZdF4zN6s", full: "" },
  "5_8":  { highlights: "https://youtu.be/5cbNewfcE38?si=RdqbWQLqKoSlDLRL", full: "" },
  "5_9":  { highlights: "https://youtu.be/UtyV2A3cFYc?si=OWq40sviBBrHfwwZ", full: "https://youtu.be/THucz-40ldg" },
  "5_10": { highlights: "https://youtu.be/ayewzvRaShw?si=tzDWf0GiDfj6ZAVP", full: "https://youtu.be/ia7QtR_-_OE" },
  "5_11": { highlights: "https://youtu.be/Edn_Eq_-8MY?si=hpthSfjym7iq4Lyv", full: "https://youtu.be/0ru8cxbhHbU" },
  "5_12": { highlights: "https://youtu.be/9rpVhHvNdJ0?si=bVhh4XOgrSMujCiN", full: "https://youtu.be/f7574ii21bQ" },
  "5_13": { highlights: "https://youtu.be/PPTmGxCrJjc?si=7Gfsv9_8F6ll-a6K", full: "https://youtu.be/OqR0EkiA5uQ" },
  "5_14": { highlights: "https://youtu.be/JQr1VXKAW84?si=tF2Rb9xkiLD0Gc4V", full: "https://youtu.be/p_ketb5Whho" },

  /* =======================
     SEASON 6 (games 1–18)
     ======================= */

  "6_1":  { highlights: "https://youtu.be/F3gSo5_kSxo", full: "https://youtu.be/oSs3a9AF9Wg" },
  "6_2":  { highlights: "https://youtu.be/Ck3uBsvKLKo", full: "https://youtu.be/0ioQzT6BU1Y" },
  "6_3":  { highlights: "https://youtu.be/zBw9EhovTdk", full: "https://youtu.be/f7xQioUUzOI" },
  "6_4":  { highlights: "https://youtu.be/EYkCq7Vcchs", full: "https://youtu.be/Vrs1bIwoGpk" },
  "6_5":  { highlights: "https://youtu.be/aMY1YQSRAU8", full: "https://youtu.be/HXRXLPFfvRU" },
  "6_6":  { highlights: "https://youtu.be/ruBjrUX4Voc", full: "https://youtu.be/iRvJWzIjlAM" },
  "6_7":  { highlights: "https://youtu.be/cDIvxKliN7g", full: "https://youtu.be/jA7b9ylC0Lk" },
  "6_8":  { highlights: "https://youtu.be/9P3k5ViXPfs", full: "https://youtu.be/BwiXJEj0vuA" },
  "6_9":  { highlights: "https://youtu.be/Ool6GWdRt1c", full: "https://youtu.be/R1iX0ThHhk0" },
  "6_10": { highlights: "https://youtu.be/t8PTH2LoWMU", full: "https://youtu.be/XlZ5VLxx55k" },
  "6_11": { highlights: "https://youtu.be/keDVNaVT66I", full: "https://youtu.be/IUvJdOCrTbE" },
  "6_12": { highlights: "https://youtu.be/Nk1xoDvYwWk", full: "https://youtu.be/n54Ybpmwj3Y" },
  "6_13": { highlights: "https://youtu.be/J8aS9pwhQUY", full: "https://youtu.be/hleQpTJsvm4" },
  "6_14": { highlights: "https://youtu.be/5L7XRBe8lds", full: "https://youtu.be/M453y_is-PA" },
  "6_15": { highlights: "https://youtu.be/iDPrBjM3niw", full: "https://youtu.be/cLHWH1nWpr8" },
  "6_16": { highlights: "https://youtu.be/jTCwWpivmLE", full: "https://youtu.be/oP7CCQUozxg" },
  "6_17": { highlights: "https://youtu.be/Ob4reIMRZOs", full: "https://youtu.be/bYNoXG35zBg" },
  "6_18": { highlights: "https://youtu.be/8vBpU0-__-E", full: "https://youtu.be/4WE2JCpuLZc" },

  /* =======================
     SEASON 7 (games 1–12)
     ======================= */

  "7_1":  { highlights: "https://youtu.be/VcrIqOiYOBs", full: "https://youtu.be/EUBdhblEj_0" },
  "7_2":  { highlights: "https://youtu.be/gwsROp90Q7M", full: "https://youtu.be/v6BdFMXgW8s" },
  "7_3":  { highlights: "https://youtu.be/BktGxtLOj9w", full: "https://youtu.be/KqATVRKZ-As" },
  "7_4":  { highlights: "https://youtu.be/XIm02W1uMXk", full: "https://youtu.be/ylZXfxwFho8" },
  "7_5":  { highlights: "https://youtu.be/tO0TEaHupAg", full: "https://youtu.be/CJIrdWNxwJc" },
  "7_6":  { highlights: "https://youtu.be/mK9Wkf1kM-M", full: "https://youtu.be/yGmEihAnSvQ" },
  "7_7":  { highlights: "https://youtu.be/FiVm6iY9ciU", full: "https://youtu.be/fcLmR5Lq7DQ" },
  "7_8":  { highlights: "https://youtu.be/h-YcxMTCgHY", full: "https://youtu.be/alc2T2RofnM" },
  "7_9":  { highlights: "https://youtu.be/0mG9W3_6ENU", full: "https://youtu.be/qpEgmnA1wHw" },
  "7_10": { highlights: "https://youtu.be/Uar_QJYGp8A", full: "https://youtu.be/MoCq6JzWiNk" },
  "7_11": { highlights: "https://youtu.be/sJM_smBzEvQ", full: "https://youtu.be/RzNTikWmTxo" },
  "7_12": { highlights: "https://youtu.be/gtoFvbpbgXQ", full: "https://youtu.be/yrs79-AeeIU" },

  /* =======================
     SEASON 8 (games 1–17)
     ======================= */

  "8_1":  { highlights: "https://youtu.be/G0FJXF6Bef8", full: "https://youtu.be/QxNLViLc04Q" },
  "8_2":  { highlights: "https://youtu.be/0nNzb0i6w1g", full: "https://youtu.be/7SQv2gWFwyo" },
  "8_3":  { highlights: "https://youtu.be/EFPi_9uGN8Y", full: "https://youtu.be/DFwD15LkFvA" },
  "8_4":  { highlights: "https://youtu.be/2TfnA-3L7gs", full: "https://youtu.be/uO4XmsHM98o" },
  "8_5":  { highlights: "https://youtu.be/DXEkSDJcfcU", full: "https://youtu.be/s0rB2JgEceI" },
  "8_6":  { highlights: "https://youtu.be/2IU3T6y3z_w", full: "https://youtu.be/peMAJ7ofmAk" },
  "8_7":  { highlights: "https://youtu.be/dlPeXnF6rSg", full: "https://youtu.be/IBM6nWBHFvI" },
  "8_8":  { highlights: "https://youtu.be/j-QTKmOKjuI", full: "https://youtu.be/tBfy-r5qEH8" },
  "8_9":  { highlights: "https://youtu.be/y_XpMyxXyFc", full: "https://youtu.be/RfsY10Rr70A" },
  "8_10": { highlights: "https://youtu.be/Y9tqSyDZtZ4", full: "https://youtu.be/WA3qhhURyTo" },
  "8_11": { highlights: "https://youtu.be/pnrqRHMla0Q", full: "https://youtu.be/ZAwA62xfJrs" },
  "8_12": { highlights: "https://youtu.be/1CLyKoSERNQ", full: "https://youtu.be/ncVC1Za_p5A" },
  "8_13": { highlights: "https://youtu.be/mEJWNsK8gjM", full: "https://youtu.be/dEM3bRY4coE" },
  "8_14": { highlights: "https://youtu.be/NWiaH0eTugY", full: "https://youtu.be/YXam3zRRTAs" },
  "8_15": { highlights: "https://youtu.be/HU6rcfjFub0", full: "https://youtu.be/3RT5Xq-QZQI" },
  "8_16": { highlights: "https://youtu.be/tYummFFyZNE", full: "https://youtu.be/Jmz4sQo3MHc" },
  "8_17": { highlights: "https://youtu.be/esRk_wxZzDw", full: "https://youtu.be/Zt3wQamq8v0" }
}

function el(tag, attrs={}, children=[]){
  const n = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v])=>{
    if(k === "class") n.className = v;
    else if(k === "html") n.innerHTML = v;
    else if(k.startsWith("on")) n.addEventListener(k.slice(2).toLowerCase(), v);
    else n.setAttribute(k, v);
  });
  children.forEach(c => n.appendChild(typeof c === "string" ? document.createTextNode(c) : c));
  return n;
}

function setActiveTab(){
  document.querySelectorAll("#tabs button").forEach(b=>{
    b.classList.toggle("active", b.dataset.page === state.page);
  });
}

function renderControls(){
  const c = document.getElementById("controls");
  c.innerHTML = "";

  const seasons = state.index.seasons;
  if(!state.season) state.season = seasons[0];

  const games = state.index.seasonGames[state.season] || [];
  if(state.page === "game" && (state.game === null || !games.includes(Number(state.game)))) {
    state.game = games[0];
  }

  const addSelect = (label, value, options, onChange) => {
    const sel = el("select", { onChange: (e)=>onChange(e.target.value) }, options.map(o=>{
      const opt = el("option", { value: o }, [String(o)]);
      if(String(o) === String(value)) opt.selected = true;
      return opt;
    }));
    c.appendChild(el("div", { class:"control" }, [
      el("label", {}, [label]),
      sel
    ]));
  };

  const addCheckbox = (label, checked, onChange) => {
    const inp = el("input", { type:"checkbox" });
    inp.checked = checked;
    inp.addEventListener("change", ()=>onChange(inp.checked));
    c.appendChild(el("div", { class:"control" }, [
      el("label", {}, [label]),
      inp
    ]));
  };

  if(state.page === "game"){
    addSelect("season", state.season, seasons, (v)=>{ state.season=v; state.game = (state.index.seasonGames[v]||[])[0]; refresh(); });
    addSelect("game", state.game, games, (v)=>{ state.game = Number(v); refresh(); });
  }

  if(state.page === "avg" || state.page === "tot" || state.page === "highs"){
    addCheckbox("all-time", state.allTime, (v)=>{ state.allTime=v; refresh(); });
    if(!state.allTime){
      addSelect("season", state.season, seasons, (v)=>{ state.season=v; refresh(); });
    }
  }

  if(state.page === "type"){
    addSelect("game type", state.gameType, ["PRE","REG","FINAL"], (v)=>{ state.gameType=v; refresh(); });
  }

  if(state.page === "vs"){
    addSelect("season", state.season, seasons, (v)=>{ state.season=v; state.vsOpponentSlug=null; refresh(); });
    const teams = state.index.seasonTeams[state.season] || [];
    const opts = teams.map(t => ({ name:t, slug: slugify(t) }));
    if(!state.vsOpponentSlug && opts.length) state.vsOpponentSlug = opts[0].slug;
    addSelect("opponent", state.vsOpponentSlug, opts.map(o=>o.slug), (v)=>{ state.vsOpponentSlug=v; refresh(); });
  }
}

function slugify(s){
  return String(s).trim().toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/_+/g,'_').replace(/^_|_$/g,'') || 'team';
}

function splitTeam(rows){
  const team = rows.filter(r => !String(r.NAMES).includes("Panthers"));
  const pan = rows.filter(r => String(r.NAMES).includes("Panthers"));
  return { team, pan };
}
const SUMMARY_COLS = ["NAMES","PTS","REB","AST","BLK","STL","TOV","FLS","FG%","3P%","FT%","TS%","GSC","GP"];

const SUMMARY_LABELS = {
  "NAMES":"name",
  "PTS":"pts",
  "REB":"reb",
  "AST":"ast",
  "BLK":"blk",
  "STL":"stl",
  "TOV":"tov",
  "FLS":"fls",
  "FG%":"fg",
  "3P%":"3p",
  "FT%":"ft",
  "TS%":"ts",
  "GSC":"gsc"
};

function selectCols(rows, cols){
  if(!rows || !rows.length) return [];
  const available = new Set(Object.keys(rows[0]));
  return cols.filter(c => available.has(c));
}

function appendTeamPanTables(content, rows){
  const { team, pan } = splitTeam(rows);

  /* ===== MAIN STATS ===== */

  // players – main stats
  if(team.length || pan.length){
    content.appendChild(el("h3", {}, ["Quick Stats"]));
  }

  if(team.length){
    const summaryCols = selectCols(team, SUMMARY_COLS);
    content.appendChild(buildTable(team, true, summaryCols, SUMMARY_LABELS));
  }

  // Panthers – main stats
  if(pan.length){
    content.appendChild(el("div", { style:"height:10px" }, []));
    const summaryCols = selectCols(pan, SUMMARY_COLS);
    content.appendChild(buildTable(pan, true, summaryCols, SUMMARY_LABELS));
  }

  /* ===== ADVANCED STATS TITLE ===== */
  if(team.length || pan.length){
    content.appendChild(el("h3", {}, ["Advanced Stats"]));
  }

  /* ===== ADVANCED / FULL STATS ===== */

  // players – advanced stats
  if(team.length){
    content.appendChild(buildTable(team, true));
  }

  // Panthers – advanced stats
  if(pan.length){
    content.appendChild(el("div", { style:"height:10px" }, []));
    content.appendChild(buildTable(pan, true));
  }
}


function buildTable(rows, preferDisplay=true, columnsOverride=null, labelMap=null){
  if(!rows || rows.length === 0) return el("div", { class:"note" }, ["no data"]);

  const autoKeys = Object.keys(rows[0]).filter(k => k !== "rowColor" && !k.endsWith("_display"));
  const columns = (Array.isArray(columnsOverride) && columnsOverride.length) ? columnsOverride : autoKeys;

  const toNumber = (x) => {
    if (x === null || x === undefined) return null;
    if (typeof x === "number") return x;
    if (typeof x === "string") {
      const t = x.trim();
      if (t === "") return null;
      const n = Number(t);
      return Number.isFinite(n) ? n : null;
    }
    return null;
  };

  const formatCell = (k, r) => {
    const dispKey = `${k}_display`;
    if (preferDisplay && r[dispKey] !== undefined && r[dispKey] !== null && String(r[dispKey]).trim() !== "") {
      return r[dispKey];
    }

    if (k.includes("%")) {
      const n = toNumber(r[k]);
      if (n === null) return r[k];
      if (n >= 0 && n <= 1) return `${(n * 100).toFixed(2)}%`;
      if (n > 1 && n <= 100) return `${Number(n).toFixed(2)}%`;
      return `${n}%`;
    }

    return r[k];
  };

  const headerText = (k) => (labelMap && labelMap[k]) ? labelMap[k] : k;

  const thead = el("thead", {}, [el("tr", {}, columns.map(k => el("th", {}, [headerText(k)])))]);
  const tbody = el("tbody", {}, rows.map(r=>{
    const bg = r.rowColor || "#A6C9EC";
    return el("tr", {}, columns.map(k=>{
      const v = formatCell(k, r);
      return el("td", { style:`background:${bg};` }, [String(v ?? "")]);
    }));
  }));

  return el("div", { class:"table-wrap" }, [el("table", {}, [thead, tbody])]);
}

async function renderGame(){
  const content = document.getElementById("content");
  content.innerHTML = "";

  const payload = await loadJSON(`data/games/${state.season}_${state.game}.json`);

  content.appendChild(el("h2", {}, [`Season ${payload.season} Game ${payload.game} Stats`]));

  const cards = el("div", { class:"cards" }, [
    el("div", { class:"card team-card" }, [
      el("div", { class:"title" }, ["Panthers"]),
      el("div", { class:"score" }, [String(payload.teamScore)])
    ]),
    el("div", { class:"card", style:`background:${payload.opponentColor}; color:white;` }, [
      el("div", { class:"title" }, [String(payload.opponent).toLowerCase()]),
      el("div", { class:"score" }, [String(payload.opponentScore)])
    ])
  ]);
  content.appendChild(cards);

  appendTeamPanTables(content, payload.players);
  // ===== GAME VIDEOS =====
const videoKey = `${payload.season}_${payload.game}`;
const videos = GAME_VIDEOS[videoKey];

if (videos) {
  content.appendChild(el("div", { style: "margin-top:24px" }, [
    el("h3", {}, ["Game Footage"]),
    el("div", { class: "video-links" }, [
      videos.highlights
        ? el("a", {
            href: videos.highlights,
            target: "_blank",
            class: "video-link"
          }, ["▶ Watch Highlights"])
        : null,

      videos.full
        ? el("a", {
            href: videos.full,
            target: "_blank",
            class: "video-link"
          }, ["▶ Watch Full Game"])
        : null
    ].filter(Boolean))
  ]));
}
}

async function renderAggregate(kind){
  const content = document.getElementById("content");
  content.innerHTML = "";

  const titleMap = { averages:"Player Averages", totals:"Player Totals", highs:"Career Highs" };
  content.appendChild(el("h2", {}, [titleMap[kind] || kind]));

  let path;
  if(state.allTime){
    path = `data/aggregates/${kind}_all.json`;
  } else {
    path = `data/aggregates/${kind}_by_season_${state.season}.json`;
  }
  const rows = await loadJSON(path);

  appendTeamPanTables(content, rows);
}

async function renderType(){
  const content = document.getElementById("content");
  content.innerHTML = "";

  content.appendChild(el("h2", {}, [`Stats By Game Type (${state.gameType})`]));
  const rows = await loadJSON(`data/aggregates/by_type_${state.gameType}.json`);
  appendTeamPanTables(content, rows);
}

async function renderVs(){
  const content = document.getElementById("content");
  content.innerHTML = "";

  const teams = state.index.seasonTeams[state.season] || [];
  const name = teams.find(t => slugify(t) === state.vsOpponentSlug) || state.vsOpponentSlug;
  content.appendChild(el("h2", {}, [`Averages vs ${String(name).toLowerCase()} (season ${state.season})`]));

  const payload = await loadJSON(`data/vs/vs_${state.season}_${state.vsOpponentSlug}.json`);
  const rows = payload.rows || [];
  appendTeamPanTables(content, rows);
}

async function refresh(){
  setActiveTab();
  renderControls();
  if(state.page === "game") return renderGame();
  if(state.page === "avg") return renderAggregate("averages");
  if(state.page === "tot") return renderAggregate("totals");
  if(state.page === "highs") return renderAggregate("highs");
  if(state.page === "type") return renderType();
  if(state.page === "vs") return renderVs();
}

async function init(){
  state.index = await loadJSON("data/index.json");

  document.querySelectorAll("#tabs button").forEach(b=>{
    b.addEventListener("click", ()=>{
      state.page = b.dataset.page;
      refresh();
    });
  });

  state.season = state.index.seasons[0];
  state.game = (state.index.seasonGames[state.season] || [])[0];
  refresh();
}

init();
