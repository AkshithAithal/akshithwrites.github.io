const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

/* Create particles */
for (let i = 0; i < 120; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 1,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5
  });
}

/* Draw particles */
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

    // ✨ mix of red + green glow
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
    gradient.addColorStop(0, "rgba(255,0,0,0.8)");
    gradient.addColorStop(1, "rgba(0,255,0,0)");

    ctx.fillStyle = gradient;
    ctx.fill();

    // movement
    p.x += p.speedX;
    p.y += p.speedY;

    // bounce edges
    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
  });

  requestAnimationFrame(drawParticles);
}

/* Resize fix */
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

drawParticles();
