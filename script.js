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
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (3 + Math.random() * 2) + 's';
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 300);

// ===== Game Setup =====
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const heartsEmojis = ["💙","💚","💛","💜","🧡","❤️"];

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const heartSize = 40; // width & height of emoji bounding box

let heartX = Math.random() * (canvasWidth - heartSize);
let heartY = Math.random() * (canvasHeight - heartSize);
let currentHeart = heartsEmojis[Math.floor(Math.random()*heartsEmojis.length)];
let score = 0;
let gameOver = false;

// ===== Draw Heart Emoji =====
function drawHeart(x, y, emoji){
  ctx.font = '40px Arial';
  ctx.fillText(emoji, x, y + 30);
}

// ===== Draw Final Apology Message =====
function drawApologyMessage() {
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(20, 50, 360, 300);
  ctx.fillStyle = 'white';
  ctx.font = '16px Arial';
  ctx.textAlign = 'center';
  const messageLines = [
    "My Elizabeth, I'm truly sorry for acting without you..",
    "I never intend to let you down like that,",
    "and I'm sorry for all the past mistakes I did",
    "I still need you, and I know you need me too."
    "You must be busy and tired but it's okay, don't mind me baby",
    "Your man won't go anywhere, I'll always be here for your",
    "peace and comfort, and to support you in any",
    "way I can. So I hope you can still forgive me..",
    "I love you, Mahal kita, Te amo, Je t’aime, Ich liebe dich,", 
    "愛してる, 사랑해, 我爱你, أحبك, Я тебя люблю, करती हूँ,",
    "Nakupenda, Seni seviyorum, Σ’ αγαπώ, Eu te amo, always🩵"
  ];
  for(let i=0; i<messageLines.length; i++){
    ctx.fillText(messageLines[i], canvasWidth/2, 80 + i*30);
  }
  ctx.textAlign = 'start';
}

// ===== Click Handling =====
canvas.addEventListener('click', function(e){
  if(gameOver) return;
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  if(mouseX > heartX && mouseX < heartX + heartSize && mouseY > heartY && mouseY < heartY + heartSize){
    score++;
    // New heart emoji & position (inside canvas)
    currentHeart = heartsEmojis[Math.floor(Math.random()*heartsEmojis.length)];
    heartX = Math.random() * (canvasWidth - heartSize);
    heartY = Math.random() * (canvasHeight - heartSize);

    if(score >= 19){
      gameOver = true;
    }
  }
});

// ===== Game Loop =====
function gameLoop() {
  ctx.clearRect(0,0,canvasWidth,canvasHeight);

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
