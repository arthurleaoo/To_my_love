import { heartAnimation } from "./heartAnimation.js";
import { SlideNav } from "./slide.js";

const slides = new SlideNav(".slide-item", ".slides-all");
slides.init();
slides.addControl();

document.addEventListener("DOMContentLoaded", () => {
  heartAnimation();
});
