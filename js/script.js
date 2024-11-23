import { SlideNav } from "./slide.js";
import { typeText, heartAnimation } from "./heartAnimation.js";
import { dateCount } from "./countDays.js";
import { audioPlayer } from "./audioPlayer.js";

// Slides de Imagens
const slides = new SlideNav(".slide-item", ".slides-all");
slides.init();
slides.addControl();

// Contagem dinâmica de dias
dateCount();

// Animação de "typing" ao h1 principal
document.addEventListener("DOMContentLoaded", () => {
  const h1 = document.querySelector(".text-effect");
  const text = "Ruan & Alyne.";
  const typingSpeed = 200; // Velocidade de digitação (ms por letra)

  // Inicia o efeito de digitação
  typeText(h1, text, typingSpeed, heartAnimation);
});

//  audioPlayer
audioPlayer();
