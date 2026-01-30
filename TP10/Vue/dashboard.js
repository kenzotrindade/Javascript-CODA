const serverIp = document.getElementById("server-ip");
const formIp = document.getElementById("config-form");
const playerSelector = document.getElementById("player-selector");
const leaderBoard = document.getElementById("leaderboard-body");
const indicator = document.getElementById("sync-indicator");
let isFirstLoad = true;
let currentSort = "totalKills";

formIp.addEventListener("submit", (e) => {
  e.preventDefault();
  loop();
});

async function loadPlayers() {
  try {
    const response = await fetch(
      "http://" + serverIp.value + "/api/listPlayers",
    );

    if (!response.ok) {
      throw new Error("Erreur");
    }

    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

async function loadPlayerStats(name) {
  try {
    const response = await fetch(
      "http://" + serverIp.value + "/api/stats?name=" + name,
    );

    if (!response.ok) {
      throw new Error("Erreur");
    }

    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

async function loadRanking() {
  const players = await loadPlayers();
  const tableBody = document.getElementById("leaderboard-body");
  const selectedName = playerSelector.value;
  let rang = 1;

  for (let p of players) {
    const stats = await loadPlayerStats(p.name);
    p.overallRanking = stats ? stats.overallRanking : 0;
  }

  players.sort((a, b) => {
    if (currentSort === "overallRanking") {
      return a[currentSort] - b[currentSort];
    }
    return b[currentSort] - a[currentSort];
  });

  tableBody.innerHTML = "";

  for (let p of players) {
    let classe = p.name === selectedName ? 'class="row-active"' : "";

    tableBody.innerHTML += `<tr ${classe}>
      <td>${rang}</td>
      <td>${p.name}</td>
      <td>${p.gamesPlayed}</td>
      <td>${p.totalKills}</td>
      <td>${p.totalDeaths}</td>
      <td>${parseFloat(p.kdRatio).toFixed(2)}</td>
      <td>#${parseFloat(p.overallRanking).toFixed(2)}</td>
    </tr>`;
    rang++;
  }
}

async function loadProfile(name) {
  const player = await loadPlayerStats(name);

  document.getElementById("stat-name").textContent = player.name;
  document.getElementById("my-kills").textContent = player.totalKills;
  document.getElementById("my-deaths").textContent = player.totalDeaths;
  document.getElementById("my-kd").textContent = parseFloat(
    player.kdRatio,
  ).toFixed(2);
  document.getElementById("my-rank").textContent = "#" + player.lastGameRank;
  document.getElementById("avg-rank").textContent =
    "#" + parseFloat(player.overallRanking).toFixed(2);
}

async function updatePlayerSelector(players) {
  const selector = document.getElementById("player-selector");
  const previous = selector.value;
  selector.innerHTML = '<option value="">-- Choisir un guerrier --</option>';
  players.forEach((p) => {
    const option = document.createElement("option");
    option.value = p.name;
    option.textContent = p.name;
    selector.appendChild(option);
  });
  selector.value = previous;
}

async function loop() {
  const players = await loadPlayers();
  if (indicator) indicator.classList.add("sync-active");

  await loadRanking();
  if (players) updatePlayerSelector(players);

  if (isFirstLoad) {
    playerSelector.value = "Zbooba";
    await loadProfile("Zbooba");
    isFirstLoad = false;
  } else {
    await loadProfile(playerSelector.value);
  }

  setTimeout(() => {
    if (indicator) indicator.classList.remove("sync-active");
  }, 800);
}

playerSelector.addEventListener("change", (e) => loadProfile(e.target.value));

leaderBoard.addEventListener("click", (e) => {
  const row = e.target.closest("tr");
  if (row) {
    const playerName = row.cells[1].textContent;
    playerSelector.value = playerName;
    loadProfile(playerName);
  }
});

document.querySelector("thead tr").addEventListener("click", (e) => {
  const header = e.target.closest(".sortable");
  if (!header) return;

  document
    .querySelectorAll(".sortable")
    .forEach((el) => el.classList.remove("active"));
  header.classList.add("active");

  currentSort = header.id;
  loadRanking();
});

loop();
setInterval(loop, 5000);
