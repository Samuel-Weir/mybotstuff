// main.js

let maxRounds = 0;
let round = 1;
let history = [];
let bot1, bot2;

let manualOverrides = {
  bot1: null,
  bot2: null,
};

function createBot(name, logicFn) {
  return {
    name,
    health: 3,
    ammo: 0,
    logic: logicFn,
    lastChoice: null
  };
}

function generateHealthBar(health) {
  const percent = (health / 3) * 100;
  return `<div class="health-bar" style="width: ${percent}%"></div>`;
}

function generateManualButtons(botName, player) {
  const target = document.getElementById(player === "Player1" ? "bot1Stats" : "bot2Stats");
  const idPrefix = `${botName}_${player}`;

  target.innerHTML += `
    <div class="bot-manual">
      <button id="${idPrefix}_Shoot">🔫 Shoot</button>
      <button id="${idPrefix}_Reload">🔁 Reload</button>
      <button id="${idPrefix}_Block">🛡 Block</button>
      <button id="${idPrefix}_Auto">🤖 Auto</button>
    </div>
  `;

  document.getElementById(`${idPrefix}_Shoot`).onclick = () => manualBotAction(player.toLowerCase(), "Shoot");
  document.getElementById(`${idPrefix}_Reload`).onclick = () => manualBotAction(player.toLowerCase(), "Reload");
  document.getElementById(`${idPrefix}_Block`).onclick = () => manualBotAction(player.toLowerCase(), "Block");
  document.getElementById(`${idPrefix}_Auto`).onclick = () => manualBotAction(player.toLowerCase(), null);
}

function updateBotStats() {
  const bot1Stats = document.getElementById("bot1Stats");
  const bot2Stats = document.getElementById("bot2Stats");
  const bot1Img = `./bots/bPortraits/${bot1.name}.png`;
  const bot2Img = `./bots/bPortraits/${bot2.name}.png`;

  bot1Stats.innerHTML = `
    <img class="avatar" src="${bot1Img}" onerror="this.src='assets/default.png'" />
    <h2>${bot1.name}</h2>
    ${generateHealthBar(bot1.health)}
    <p>💥 Ammo: ${bot1.ammo}</p>
    <p>🧠 Last Choice: ${bot1.lastChoice || '-'}</p>
  `;

  bot2Stats.innerHTML = `
    <img class="avatar" src="${bot2Img}" onerror="this.src='bots/bPortraits/default.png'" />
    <h2>${bot2.name}</h2>
    ${generateHealthBar(bot2.health)}
    <p>💥 Ammo: ${bot2.ammo}</p>
    <p>🧠 Last Choice: ${bot2.lastChoice || '-'}</p>
  `;

  generateManualButtons(bot1.name, "Player1");
  generateManualButtons(bot2.name, "Player2");
}

function logMessage(msg) {
  const log = document.getElementById("log");
  const line = document.createElement("p");
  line.textContent = msg;
  log.appendChild(line);
  log.scrollTop = log.scrollHeight;
}

function logRound(round, bot1, bot2) {
  logMessage(`ROUND ${round}: ${bot1.name} ➡️ ${bot1.lastChoice} | ${bot2.name} ➡️ ${bot2.lastChoice}`);
}

function resolveActions(botA, actionA, botB, actionB) {
  const aShoots = actionA === "Shoot" && botA.ammo > 0;
  const bShoots = actionB === "Shoot" && botB.ammo > 0;

  if (actionA === "Reload") botA.ammo++;
  if (actionB === "Reload") botB.ammo++;

  if (aShoots) botA.ammo--;
  if (bShoots) botB.ammo--;

  if (aShoots && actionB !== "Block") botB.health--;
  if (bShoots && actionA !== "Block") botA.health--;

  playSound(actionA);
  playSound(actionB);
}

function showActionFX(bot, action) {
  const fx = document.getElementById("actionFx");
  fx.innerText = `${bot.name} ➡️ ${action}!`;
  setTimeout(() => (fx.innerText = ""), 1200);
}

function playSound(action) {
  const sfx = new Audio(`assets/sfx/${action.toLowerCase()}.mp3`);
  sfx.play();
}

function declareWinner() {
  document.getElementById("nextRoundBtn").disabled = true;
  document.getElementById("exportBtn").style.display = "inline";

  const winner = bot1.health > bot2.health ? bot1
              : bot2.health > bot1.health ? bot2
              : null;

  const modal = document.createElement("div");
  modal.id = "winnerModal";
  modal.innerHTML = `
    <div class="modal-content">
      <h2>${winner ? `🏆 ${winner.name} Wins!` : "🤝 It's a draw!"}</h2>
      <ul>
        <li><strong>${bot1.name}</strong> - HP: ${bot1.health}, Ammo: ${bot1.ammo}</li>
        <li><strong>${bot2.name}</strong> - HP: ${bot2.health}, Ammo: ${bot2.ammo}</li>
      </ul>
      <button onclick="document.getElementById('winnerModal').remove()">Close</button>
    </div>
  `;
  document.body.appendChild(modal);
  modal.style.display = "flex";
}

function playRound() {
  const choice1 = manualOverrides.bot1 || bot1.logic(history, bot1, bot2);
  const choice2 = manualOverrides.bot2 || bot2.logic(history, bot2, bot1);

  bot1.lastChoice = choice1;
  bot2.lastChoice = choice2;

  manualOverrides.bot1 = null;
  manualOverrides.bot2 = null;

  resolveActions(bot1, choice1, bot2, choice2);

  history.push({
    round,
    results: [
      { name: bot1.name, choice: choice1, health: bot1.health, ammo: bot1.ammo },
      { name: bot2.name, choice: choice2, health: bot2.health, ammo: bot2.ammo }
    ]
  });

  updateBotStats();
  logRound(round, bot1, bot2);
  showActionFX(bot1, choice1);
  setTimeout(() => showActionFX(bot2, choice2), 600);

  round++;

  if (round > maxRounds || bot1.health <= 0 || bot2.health <= 0) {
    declareWinner();
  }
}

window.manualBotAction = function(botId, action) {
  manualOverrides[botId] = action;
  logMessage(`${botId.toUpperCase()} set to: ${action || 'Auto'}`);
};

// Event listeners

document.getElementById("startGameBtn").addEventListener("click", async () => {
  maxRounds = parseInt(document.getElementById("roundCountInput").value, 10);
  round = 1;
  history = [];
  document.getElementById("log").innerHTML = "";
  document.getElementById("nextRoundBtn").disabled = false;
  document.getElementById("exportBtn").style.display = "none";
  document.getElementById("actionFx").innerText = "";

  manualOverrides.bot1 = null;
  manualOverrides.bot2 = null;

  const bot1Path = document.getElementById("bot1Select").value;
  const bot2Path = document.getElementById("bot2Select").value;

  const bot1Module = await import(bot1Path);
  const bot2Module = await import(bot2Path);

  const Bot1 = bot1Module.default;
  const Bot2 = bot2Module.default;

  bot1 = createBot(Bot1.name || "Bot 1", Bot1);
  bot2 = createBot(Bot2.name || "Bot 2", Bot2);

  updateBotStats();
  logMessage(`🟢 Game started: ${maxRounds} rounds`);
});

document.getElementById("nextRoundBtn").addEventListener("click", () => {
  playRound();
});

document.getElementById("exportBtn").addEventListener("click", () => {
  const data = JSON.stringify(history, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "match-history.json";
  a.click();
  URL.revokeObjectURL(url);
});
