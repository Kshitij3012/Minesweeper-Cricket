// Game settings
const gridSize = 6; // Adjust this value to change the grid size
const totalFielders = 11;

let score = 0;
let fieldersRemaining = totalFielders;
let gameEnded = false;

// Generate random fielder positions
const fielderPositions = generateFielderPositions();

// Generate the game grid
const grid = document.getElementById('grid');
for (let i = 0; i < gridSize; i++) {
  for (let j = 0; j < gridSize; j++) {
    const block = document.createElement('div');
    block.className = 'block';
    block.dataset.row = i;
    block.dataset.column = j;
    block.addEventListener('click', clickBlock);
    grid.appendChild(block);
  }
}

function clickBlock(event) {
  if (gameEnded) return;

  const block = event.target;
  const row = parseInt(block.dataset.row);
  const column = parseInt(block.dataset.column);

  if (fielderPositions[row][column]) {
    endGame();
  } else {
    score++;
    block.removeEventListener('click', clickBlock);
    block.classList.add('empty');
    block.textContent = '1';
    updateScore();
  }
}

function endGame() {
  gameEnded = true;
  revealFielders();
  const finalScore = document.getElementById('score').textContent;
  alert('Game Over!\nFinal Score: ' + finalScore);
  showRestartButton();
}

function revealFielders() {
  const blocks = document.getElementsByClassName('block');
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const row = parseInt(block.dataset.row);
    const column = parseInt(block.dataset.column);
    if (fielderPositions[row][column]) {
      block.classList.add('fielder');
      block.textContent = 'F';
      block.addEventListener('click', showScore);
    }
    block.removeEventListener('click', clickBlock);
  }
}

function updateScore() {
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = score;
}

function showScore(event) {
  const block = event.target;
  const finalScore = document.getElementById('score').textContent;
  alert('Score: ' + finalScore);
}

function generateFielderPositions() {
  const positions = [];
  for (let i = 0; i < gridSize; i++) {
    positions.push(Array(gridSize).fill(false));
  }

  let fieldersPlaced = 0;
  while (fieldersPlaced < totalFielders) {
    const row = Math.floor(Math.random() * gridSize);
    const column = Math.floor(Math.random() * gridSize);
    if (!positions[row][column]) {
      positions[row][column] = true;
      fieldersPlaced++;
    }
  }

  return positions;
}

function showRestartButton() {
  const restartBtn = document.getElementById('restartBtn');
  restartBtn.classList.remove('hidden');
}

function restartGame() {
  location.reload();
}
