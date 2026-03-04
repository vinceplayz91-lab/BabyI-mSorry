// Play background music
const music = document.getElementById('bgMusic');
music.play().catch(() => console.log("Tap to play music"));

// Floating hearts animation
const heartsContainer = document.querySelector('.hearts-container');
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (3 + Math.random() * 2) + 's';
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 300);

// ======= Game =======
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let heartX = Math.random() * 360;
let heartY = Math.random() * 360;
let score = 0;

function drawHeart(x, y) {
  ctx.fillStyle = '#ff3399';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x, y-10, x-20, y-10, x-20, y+10);
  ctx.bezierCurveTo(x-20, y+30, x, y+40, x, y+60);
  ctx.bezierCurveTo(x, y+40, x+20, y+30, x+20, y+10);
  ctx.bezierCurveTo(x+20, y-10, x, y-10, x, y);
  ctx.fill();
}

canvas.addEventListener('click', function(e){
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  // Check if clicked inside heart area
  if(mouseX > heartX-20 && mouseX < heartX+20 && mouseY > heartY-10 && mouseY < heartY+60){
    score++;
    heartX = Math.random() * 360;
    heartY = Math.random() * 360;
  }
});

function gameLoop() {
  ctx.clearRect(0,0,400,400);
  drawHeart(heartX, heartY);
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 10, 30);
  requestAnimationFrame(gameLoop);
}

gameLoop();