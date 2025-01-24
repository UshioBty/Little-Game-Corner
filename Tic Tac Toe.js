// Select game elements
const board = document.getElementById("game-board");
const cells = document.querySelectorAll(".cell");
const undoButton = document.getElementById("undo");
const restartButton = document.getElementById("restart");
const exitButton = document.getElementById("exit");

const player1ScoreEl = document.getElementById("player1-score");
const player2ScoreEl = document.getElementById("player2-score");

// Initialize game variables
let moves = []; // To track moves for undo
let currentPlayer = "X"; // Player 1 is X, Player 2 is O
let player1Score = 0;
let player2Score = 0;
let isGameOver = false;

// Handle cell click
function handleCellClick(event) {
  if (isGameOver) return; // Stop if the game is over

  const cell = event.target;
  const index = cell.dataset.index;

  if (cell.textContent !== "") return; // Skip if cell is already filled

  // Mark the cell
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  // Track the move
  moves.push({ index, player: currentPlayer });

  // Check for a winner or tie
  if (checkWin()) {
    isGameOver = true;
    if (currentPlayer === "X") {
      player1Score++;
      player1ScoreEl.textContent = player1Score;
      alert("Player 1 Wins! Click OK to restart.");
    } else {
      player2Score++;
      player2ScoreEl.textContent = player2Score;
      alert("Player 2 Wins! Click OK to restart.");
    }
    restartGame();
    return;
  }

  if (moves.length === 9) {
    isGameOver = true;
    alert("It's a Tie! Click OK to restart.");
    restartGame();
    return;
  }

  // Switch players
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Undo the last move
function undoMove() {
  if (moves.length === 0 || isGameOver) return;

  const lastMove = moves.pop();
  const cell = cells[lastMove.index];
  cell.textContent = "";
  cell.classList.remove("taken");

  currentPlayer = lastMove.player; // Switch back to the last player
}

// Restart the game
function restartGame() {
  moves = [];
  currentPlayer = "X";
  isGameOver = false;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}

// Exit the game
function exitGame() {
  window.location.href = "index.html"; // Redirect to home page
}

// Check for a winner
function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return (
      cells[a].textContent === currentPlayer &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    );
  });
}

// Event listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
undoButton.addEventListener("click", undoMove);
restartButton.addEventListener("click", restartGame);
exitButton.addEventListener("click", exitGame);