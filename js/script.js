import { SlideNav } from "./slide.js";
import { heartAnimation } from "./heartAnimation.js";
import { dateCount } from "./countDays.js";

// Slides de Imagens
const slides = new SlideNav(".slide-item", ".slides-all");
slides.init();
slides.addControl();

// Animação dos corações no título
document.addEventListener("DOMContentLoaded", () => {
  heartAnimation();
});

// Contagem dinâmica de dias
dateCount();
