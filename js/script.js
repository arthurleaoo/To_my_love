import { createStars, drawStars } from "./particles.js";
import audioPlayer from "./audioPlayer.js";
import Slide from "./slide.js";
import { typeText, heartAnimation } from "./heartAnimation.js";
import dateCount from "./countDays.js";

// particles
createStars();
drawStars();

// audio player
audioPlayer();

// slide de imagens
const slides = new Slide(".slide-item", ".slides-all");
slides.init();

// Animação de "typing" ao h1 principal
document.addEventListener("DOMContentLoaded", () => {
  const h1 = document.querySelector(".text-effect");
  const text = "Arthur & Clara";
  const typingSpeed = 300; // Velocidade de digitação (ms por letra)

  // Inicia o efeito de digitação
  typeText(h1, text, typingSpeed, heartAnimation);
});

// contador de data
setInterval(dateCount, 1000);
