const canvasStars = document.createElement("canvas");
document.getElementById("particles-stars").appendChild(canvasStars);
const ctxStars = canvasStars.getContext("2d");

canvasStars.width = window.innerWidth;
canvasStars.height = document.documentElement.scrollHeight;

const stars = [];

export function createStars() {
  for (let i = 0; i < 550; i++) {
    stars.push({
      x: Math.random() * canvasStars.width,
      y: Math.random() * canvasStars.height,
      radius: Math.random() * 1.4,
      alpha: Math.random(),
      dx: Math.random() * 0.5 - 0.25,
    });
  }
}

export function drawStars() {
  ctxStars.clearRect(0, 0, canvasStars.width, canvasStars.height);
  stars.forEach((star) => {
    ctxStars.beginPath();
    ctxStars.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctxStars.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctxStars.fill();
    star.x += star.dx;

    if (star.x > canvasStars.width || star.x < 0) star.x = Math.random() * canvasStars.width;
  });
  requestAnimationFrame(drawStars);
}
