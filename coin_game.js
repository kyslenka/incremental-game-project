const body = document.querySelector("body");
const container = document.getElementById("container");
const sidebar = document.getElementById("sidebar");
const coin = document.getElementById("coin");
const popupMessage = document.getElementById("popupMessage");
const popup = document.getElementById("popup");
const bodyX = body.clientHeight;
const bodyY = body.clientWidth;

const sounds = {
  buy: new Audio("sounds/buy.mp3"),
  coin: new Audio("sounds/coin.mp3")
};

let miner = {
  name: "Miner",
  cps: 1,
  cost: 50,
  owned: 0,
  img: (src = "imgs/miner.jpeg")
};

let computer = {
  name: "Computer",
  cps: 10,
  cost: 500,
  owned: 0,
  img: (src = "imgs/computer.png")
};

let datacenter = {
  name: "Data center",
  cps: 100,
  cost: 2000,
  owned: 0,
  img: (src = "imgs/datacenter.png")
};

let supercomputer = {
  name: "Super computer",
  cps: 1000,
  cost: 50000,
  owned: 0,
  img: (src = "imgs/supercomputer.jpg")
};

let quantumComputer = {
  name: "Quantum computer",
  cps: 10000,
  cost: 200000,
  owned: 0,
  img: (src = "imgs/quantumcomputer.jpg")
};

let aI = {
  name: "AI",
  cps: 100000,
  cost: 5000000,
  owned: 0,
  img: (src = "imgs/AI.png")
};

let matrioshkaBrain = {
  name: "Matrioshka brain",
  cps: 1000000,
  cost: 20000000,
  owned: 0,
  img: (src = "imgs/matrioshka.jpg")
};

let simulation = {
  name: "Simulation",
  cps: 0,
  cost: 1000000000,
  owned: 0,
  img: (src = "imgs/simulation.jpg")
};

let resources = [
  miner,
  computer,
  datacenter,
  supercomputer,
  quantumComputer,
  aI,
  matrioshkaBrain,
  simulation
];

let resourceId = [
  "miner",
  "computer",
  "datacenter",
  "supercomputer",
  "quantumcomputer",
  "AI",
  "matrioshka",
  "simulation"
];

let button = [];
let asset = [];
for (let i = 0; i < 8; i++) {
  button.push(document.getElementById(`${resourceId[i]}Res`));
  asset.push(document.getElementById(`${resourceId[i]}Asset`));
}

let coins = 1000000;
let cps = 0;
let clicks = 0;
let timeout = 40000;
let maxBonusTimeout = 60000;
let bonus = 0;

const counterWrapper = document.createElement("div");

function createCounter() {
  counterWrapper.innerText = Math.floor(coins) + "\n" + "coins";
  counterWrapper.classList.add("counterWrapper");
  body.appendChild(counterWrapper);
}

createCounter();

function updateCounter() {
  coins += cps / 100;
  if (coins > 999999) {
    counterWrapper.innerText =
      (coins / 1000000).toFixed(2) + " million" + "\n" + "coins";
  } else if (coins > 999999999) {
    counterWrapper.innerText =
      (coins / 1000000000).toFixed(2) + "\n" + " billion" + "\n" + "coins";
  } else {
    counterWrapper.innerText = Math.floor(coins) + "\n" + "coins";
  }
  if (cps > 1000) sidebar.style.backgroundImage = "url(imgs/fallingcoins0.gif)";
  if (cps > 100000)
    sidebar.style.backgroundImage = "url(imgs/fallingcoins1.gif)";
  if (cps > 1000000)
    sidebar.style.backgroundImage = "url(imgs/fallingcoins2.gif)";
  for (let i = 0; i < achievements.length; i++) {
    if (achievements[i].isComplete() && achievements[i].seen) {
      popupMessage.innerText = achievements[i].message;
      achievements[i].seen = false;
      show(popup);
    }
  }
}

let interval = setInterval(() => updateCounter(), 10);
hide(popup);

function game() {
  if (cps === 0) coins += 1;
  coins += cps;
  clicks += clicks;
  counterWrapper.innerText = Math.floor(coins) + "\n" + "coins";
  playSounds("coin");
  createCpsCounter();
}

function buy(resource, num) {
  let counter = document.getElementById(`${resource.name}1`);
  if (coins < resource.cost) return;
  resource.owned += 1;
  coins -= resource.cost;
  counterWrapper.innerText = Math.floor(coins) + "\n" + "coins";
  counter.innerText = `${resource.owned}`;
  playSounds("buy");
  cps += resource.cps;
  if (resource.owned < 10) updateAsset(resource, num);
  if (simulation.owned === 1) location.reload();
}

function updateAsset(resource, num) {
  let assetImg = document.createElement("img");
  assetImg.classList.add("asset");
  assetImg.setAttribute("src", resource.img);
  asset[num].appendChild(assetImg);
}

function setupResource(button, resource, asset) {
  if (resource.owned > 0) asset.style.opacity = "1";
  if (coins < resource.cost / 2 && resource.owned === 0) hide(button);
  if (coins >= resource.cost / 2) show(button);
  button.style.opacity = "0.5";
  if (coins >= resource.cost) button.style.opacity = "1";
}

for (let i = 0; i < 8; i++) {
  setInterval(() => setupResource(button[i], resources[i], asset[i]), 100);
}

function createOwnedCounter(object, resource) {
  let ownedCounter = document.createElement("div");
  ownedCounter.innerText = `${resource.owned}`;
  ownedCounter.classList.add("ownedCounter");
  ownedCounter.setAttribute("id", `${resource.name}1`);
  object.appendChild(ownedCounter);
}

for (let i = 0; i < 8; i++) {
  createOwnedCounter(button[i], resources[i]);
}

let bonusCoin = document.createElement("img");

function createBonusCoin() {
  bonusCoin.src = "imgs/coin.png";
  bonusCoin.classList.add("bonuscoin");
  bonusCoin.style.top = getRandom(0, bodyX - 200) + "px";
  bonusCoin.style.left = getRandom(0, bodyY - 200) + "px";
  body.appendChild(bonusCoin);
  bonusCoin.addEventListener("click", bonusCoinClick);
  let x2 = setTimeout(createBonusCoin, getRandom(0, maxBonusTimeout));
  x4 = setTimeout(() => {
    body.removeChild(bonusCoin);
  }, 10000);
}

function bonusCoinClick() {
  body.removeChild(bonusCoin);
  playSounds("coin");
  bonus = cps * getRandom(2, 20);
  coins += bonus;
  createBonusCoinCpsCounter(bonus);
}

let x1 = setTimeout(createBonusCoin, timeout);

function createCpsCounter() {
  let cpsCounter = document.createElement("div");
  cpsCounter.setAttribute = ("id", "cpsCounter");
  cpsCounter.innerText = "+" + cps;
  if (cps === 0) cpsCounter.innerText = "+1";
  cpsCounter.classList.add("cpsCounter");
  body.appendChild(cpsCounter);
  x3 = setTimeout(() => {
    body.removeChild(cpsCounter);
  }, 500);
}

function createBonusCoinCpsCounter(bonus) {
  let bonusCoinCpsCounter = document.createElement("div");
  bonusCoinCpsCounter.setAttribute = ("id", "bonusCoinCpsCounter");
  bonusCoinCpsCounter.innerText = "+" + bonus;
  if (cps === 0) bonusCoinCpsCounter.innerText = "+1";
  bonusCoinCpsCounter.classList.add("bonusCoinCpsCounter");
  bonusCoinCpsCounter.style.top = bonusCoin.style.top;
  bonusCoinCpsCounter.style.left = bonusCoin.style.left;
  body.appendChild(bonusCoinCpsCounter);
  x3 = setTimeout(function() {
    body.removeChild(bonusCoinCpsCounter);
  }, 500);
}

let achievements = [
  {
    message: "Entrepreneur",
    isComplete: function() {
      return miner.owned >= 5;
    },
    seen: true
  },
  {
    message: "From rags to riches",
    isComplete: function() {
      return coins >= 1000;
    }
  },
  {
    message: "Click madness",
    isComplete: function() {
      return clicks >= 100;
    },
    seen: true
  },
  {
    message: "Money rocket",
    isComplete: function() {
      return cps >= 10000;
    },
    seen: true
  },
  {
    message: "Singularity",
    isComplete: function() {
      return aI.owned >= 1;
    },
    seen: true
  },
  {
    message: "Ready for simulation",
    isComplete: function() {
      return coins >= simulation.cost;
    },
    seen: true
  }
];

function getRandom(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function playSounds(sound) {
  sounds.buy.pause();
  sounds.coin.pause();
  sounds[sound].currentTime = 0;
  sounds[sound].play();
}

function closeMessage() {
  hide(popup);
}

function hide(element) {
  element.style.display = "none";
}

function show(element) {
  element.style.display = "block";
}
