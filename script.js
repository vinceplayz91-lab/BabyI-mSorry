// ===== Background Music =====
const music = document.getElementById('bgMusic');

// Play music on first click anywhere
document.body.addEventListener('click', function playMusicOnce() {
  music.play();
  document.body.removeEventListener('click', playMusicOnce);
});

// ===== Floating Hearts in Background =====
const heartsContainer = document.querySelector('.hearts-container');
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = Math.random() * 19 + 'vw';
  heart.style.animationDuration = (3 + Math.random() * 2) + 's';
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 300);

// ===== Game Setup =====
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const heartsEmojis = ["💙","💚","💛","💜","🧡","❤️"];

let heartX = Math.random() * 360;
let heartY = Math.random() * 360;
let currentHeart = heartsEmojis[Math.floor(Math.random()*heartsEmojis.length)];
let score = 0;
let gameOver = false;

// ===== Draw Heart Emoji =====
function drawHeart(x, y, emoji){
  ctx.font = '40px Arial';
  ctx.fillText(emoji, x, y + 30); // adjust y for emoji alignment
}

// ===== Draw Animated Pop-up Message =====
function drawApologyMessage() {
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(50, 100, 300, 200);
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.textAlign = 'center';
  ctx.fillText("💖 My Dearest Love 💖", 200, 150);
  ctx.fillText("I'm so sorry!", 200, 190);
  ctx.fillText("I hope you can forgive me", 200, 220);
  ctx.fillText("and feel how much I love you 💙", 200, 250);
  ctx.textAlign = 'start';
}

// ===== Click Handling =====
canvas.addEventListener('click', function(e){
  if(gameOver) return;
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  if(mouseX > heartX && mouseX < heartX + 40 && mouseY > heartY && mouseY < heartY + 40){
    score++;
    // New heart emoji & position
    currentHeart = heartsEmojis[Math.floor(Math.random()*heartsEmojis.length)];
    heartX = Math.random() * 360;
    heartY = Math.random() * 360;

    if(score >= 19){
      gameOver = true;
    }
  }
});

// ===== Game Loop =====
function gameLoop() {
  ctx.clearRect(0,0,400,400);

  if(!gameOver){
    drawHeart(heartX, heartY, currentHeart);
  } else {
    drawApologyMessage();
  }

  // Score Display
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 10, 30);

  requestAnimationFrame(gameLoop);
}


gameLoop();

