/* Utils */
const score = {
  player: 0,
  pc: 0
};
const choices = ["rock", "paper", "scissors"];
let isGameOver = false;
let msgHistory = [];

/* DOM Elements */
const playAgainBtn = document.getElementById("playAgain");
const choicesContainer = document.getElementById("choices");
const playerScore = document.getElementById("playerScore");
const pcScore = document.getElementById("pcScore");
const messageList = document.getElementById("messages");
const historyBox = document.getElementById("history");

/* Event Listeners */
playAgainBtn.addEventListener("click", restart);
Array.from(choicesContainer.children).forEach((e, index) =>
  e.addEventListener("click", () => {
    if (isGameOver) return;
    turn(index);
    updateScore();
    updateHistory();
    checkGameOverCondition();
    showPlayAgainButton();
  })
);

/* Logic */
function pcTurn() {
  return Math.floor(Math.random() * 3);
}

function turn(choice) {
  const pcChoice = pcTurn();
  console.log(choice, pcChoice);
  console.log(`Player: ${choices[choice]} - PC: ${choices[pcChoice]}`);
  let message = `Player chose: ${choices[choice]} and PC chose: ${choices[pcChoice]} - `;
  if (pcChoice === choice) {
    message += "It's a draw!";
  } else if (choice === 2 && pcChoice === 0) {
    score.pc++;
    message += "PC won!";
  } else if (choice > pcChoice || pcChoice - choice === 2) {
    score.player++;
    message += "Player won!";
  } else {
    score.pc++;
    message += "PC won!";
  }
  msgHistory.push(message);
}

function checkGameOverCondition() {
  if (score.player >= 5 || score.pc >= 5) isGameOver = true;
}

function showPlayAgainButton() {
  if (isGameOver) playAgainBtn.classList.add("show");
}

/* Rendering */

function updateScore() {
  playerScore.textContent = "Player: " + score.player;
  pcScore.textContent = "PC: " + score.pc;
}

function updateHistory() {
  messageList.innerHTML = "";
  msgHistory.forEach((msg) => {
    const li = document.createElement("li");
    li.textContent = msg;
    li.classList.add("message");
    messageList.appendChild(li);
    historyBox.scrollTop = historyBox.scrollHeight;
  });
}

function restart() {
  if (isGameOver) {
    score.player = 0;
    score.pc = 0;
    msgHistory = [];
    updateScore();
    updateHistory();
    playAgainBtn.classList.remove("show");
    isGameOver = false;
  }
}
