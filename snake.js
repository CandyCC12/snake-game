const gameBoard = document.getElementById('game-board');
const boardSize = 16;
let snake = [{x: 8, y: 8}];
let food = {x: 4, y: 4};
let dx = 1;
let dy = 0;
let score = 0;

function createGridElement() {
  const div = document.createElement('div');
  div.style.width = '20px';
  div.style.height = '20px';
  div.style.border = '1px solid #ccc';
  return div;
}

function renderGameBoard() {
  gameBoard.innerHTML = '';
  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const cell = createGridElement();
      if (snake.some(segment => segment.x === x && segment.y === y)) {
        cell.classList.add('snake');
      } else if (food.x === x && food.y === y) {
        cell.classList.add('food');
      }
      gameBoard.appendChild(cell);
    }
  }
}

function moveSnake() {
  const head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };

  
  if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    // Game over
    snake = [{x: 8, y: 8}];
    dx = 1;
    dy = 0;
    score = 0; // 重置得分

  } else {
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      placeFood();
      score++; // 增加得分
    } else {
      snake.pop();
    }
    updateScoreDisplay() ;
        const scoreElement = document.getElementById('score');
        scoreElement.textContent = '得分: ' + score;
      }
      
  }


function placeFood() {
  let x, y;
  do {
    x = Math.floor(Math.random() * boardSize);
    y = Math.floor(Math.random() * boardSize);
  } while (snake.some(segment => segment.x === x && segment.y === y));
  food = {x, y};
}

function changeDirection(event) {
  if (event.key === 'ArrowUp' && dy === 0) {
    dx = 0;
    dy = -1;
  } else if (event.key === 'ArrowDown' && dy === 0) {
    dx = 0;
    dy = 1;
  } else if (event.key === 'ArrowLeft' && dx === 0) {
    dx = -1;
    dy = 0;
  } else if (event.key === 'ArrowRight' && dx === 0) {
    dx = 1;
    dy = 0;
  }
}
function updateScoreDisplay() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = '得分: ' + score;
  }

document.addEventListener('keydown', changeDirection);
setInterval(() => {
  moveSnake();
  renderGameBoard();
}, 500);

  
