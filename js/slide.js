export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
  }

  onStart(event) {
    event.preventDefault();
    this.wrapper.addEventListener("touchmove", this.onMove, { passive: false });
  }

  onMove(event) {
    
  }

  onEnd(event) {
    this.wrapper.removeEventListener("touchmove", this.onMove);
  }

  addSlideEvents() {
    this.wrapper.addEventListener("touchstart", this.onStart, { passive: false });
    this.wrapper.addEventListener("touchend", this.onEnd, { passive: false });
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}
