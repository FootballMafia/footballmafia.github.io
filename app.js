/* =========================
   GAME LOGIC
========================= */

let totalPlayers = 0;
let currentPlayer = 1;
let impostor = 0;
let chosenPlayer = null;
let chosenHint = "";

function startGame() {
  totalPlayers = Number(document.getElementById("players").value);
  impostor = Math.floor(Math.random() * totalPlayers) + 1;

  chosenPlayer = playersDB[Math.floor(Math.random() * playersDB.length)];
  chosenHint =
    chosenPlayer.hints[
      Math.floor(Math.random() * chosenPlayer.hints.length)
    ];

  currentPlayer = 1;
  document.getElementById("roleArea").classList.remove("hidden");
  document.getElementById("playerNum").innerText = currentPlayer;
}

function revealRole() {
  const card = document.getElementById("roleCard");
  const title = document.getElementById("roleTitle");
  const hint = document.getElementById("roleHint");

  card.classList.remove("hidden");

  if (currentPlayer === impostor) {
    card.classList.add("impostor");
    title.innerText = "🤫 IMPOSTOR";
    hint.innerText = "Hint: " + chosenHint;
  } else {
    card.classList.remove("impostor");
    title.innerText = "⚽ REAL PLAYER";
    hint.innerText = chosenPlayer.name;
  }
}

function nextPlayer() {
  document.getElementById("roleCard").classList.add("hidden");
  currentPlayer++;

  if (currentPlayer > totalPlayers) {
    alert("All roles assigned! Start discussing 👀");
    location.reload();
  } else {
    document.getElementById("playerNum").innerText = currentPlayer;
  }

  window.scrollTo(0, 0);
}

/* =========================
   SHARE BUTTON
========================= */

function shareGame() {
  const url = window.location.href;
  const text =
    "⚽ Guess the Football Impostor – fun party game for football fans!";

  if (navigator.share) {
    navigator.share({
      title: "Guess the Football Impostor",
      text: text,
      url: url
    });
  } else {
    window.open(
      "https://wa.me/?text=" + encodeURIComponent(text + " " + url),
      "_blank"
    );
  }
}

/* =========================
   PWA INSTALL BUTTON
========================= */

let deferredPrompt;

window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  deferredPrompt = e;
  const btn = document.getElementById("installBtn");
  if (btn) btn.style.display = "block";
});

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("installBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt = null;
      btn.style.display = "none";
    }
  });
});

/* =========================
   SERVICE WORKER
========================= */

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
