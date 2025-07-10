// JS
const canvas = document.getElementById("pingPongCanvas");
const ctx = canvas.getContext("2d");

const paddleHeight = 80, paddleWidth = 12;
const player = { x: 10, y: canvas.height / 2 - paddleHeight / 2 };
const ai = { x: canvas.width - 20, y: canvas.height / 2 - paddleHeight / 2 };
const ball = { x: 0, y: 0, radius: 10, speed: 5, dx: 5, dy: 5 };
let playerScore = 0, aiScore = 0;

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = (Math.random() > 0.5 ? 1 : -1) * ball.speed;
  ball.dy = (Math.random() > 0.5 ? 1 : -1) * ball.speed;
}

function startRestart() {
  player.y = canvas.height / 2 - paddleHeight / 2;
  ai.y = canvas.height / 2 - paddleHeight / 2;
  ball.speed = 5;
  ball.dx = ball.dy = 0;
  draw();
  setTimeout(() => {
    resetBall();
  }, 3000);
}

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRect(player.x, player.y, paddleWidth, paddleHeight, "#007A5E");
  drawRect(ai.x, ai.y, paddleWidth, paddleHeight, "#e74c3c");
  drawCircle(ball.x, ball.y, ball.radius, "#333");
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Colisão com topo/baixo
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) ball.dy *= -1;

  // Movimento da IA
  ai.y += (ball.y - (ai.y + paddleHeight / 2)) * 0.09;

  // Colisão com jogador
  if (
    ball.x - ball.radius < player.x + paddleWidth &&
    ball.y > player.y &&
    ball.y < player.y + paddleHeight
  ) {
    ball.dx *= -1;
    ball.x = player.x + paddleWidth + ball.radius; // Evita bug
  }

  // Colisão com IA
  if (
    ball.x + ball.radius > ai.x &&
    ball.y > ai.y &&
    ball.y < ai.y + paddleHeight
  ) {
    ball.dx *= -1;
    ball.x = ai.x - ball.radius; // Evita bug
  }

  // Pontuação
  if (ball.x < 0) {
    aiScore++;
    updateScore();
    resetBall();
  } else if (ball.x > canvas.width) {
    playerScore++;
    updateScore();
    resetBall();
  }
}

function updateScore() {
  document.getElementById("score").innerText = `Jogador: ${playerScore} | IA: ${aiScore}`;
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") player.y -= 30;
  if (e.key === "ArrowDown") player.y += 30;
});

// Controle com o mouse (opcional)
canvas.addEventListener("mousemove", function (e) {
  const rect = canvas.getBoundingClientRect();
  player.y = e.clientY - rect.top - paddleHeight / 2;
});

function gameLoop() {
  draw();
  moveBall();
  requestAnimationFrame(gameLoop);
}

// Iniciar
startRestart();
gameLoop();
