export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = { finalPosition: 0, startX: 0, movement: 0 };
  }

  // suavização da transição dos slides da função "changeSlideOnEnd()":
  transition(active) {
    this.slide.style.transition = active ? "transform .4s" : "";
  }

  moveSlide(distanceX) {
    this.dist.movePosition = distanceX;
    this.slide.style.transform = `translate3d(${distanceX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.4;
    return this.dist.finalPosition - this.dist.movement;
  }

  onStart(event) {
    this.dist.startX = event.changedTouches[0].clientX;
    this.wrapper.addEventListener("touchmove", this.onMove, { passive: false });
    this.transition(false);
  }

  onMove(event) {
    const finalPosition = this.updatePosition(event.changedTouches[0].clientX);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    this.wrapper.removeEventListener("touchmove", this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
    this.transition(true);
    this.changeSlideOnEnd();
  }

  changeSlideOnEnd() {
    if (this.dist.movement > 90 && this.index.next !== undefined) this.activeNextSlide();
    else if (this.dist.movement < -90 && this.index.prev !== undefined) this.activePrevSlide();
    else this.changeSlide(this.index.active);
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

  // Configurações dos Slides

  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slidesConfig() {
    this.slidesArray = [...this.slide.children].map((element) => {
      // o "element" é cada "li" dentro da ul. Ou seja, cada item da lista.
      const position = this.slidePosition(element);
      return { position, element };
    });
  }

  slidesIndexNav(index) {
    const last = this.slidesArray.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    };
  }

  changeSlide(index) {
    const activeSlide = this.slidesArray[index];
    this.moveSlide(activeSlide.position);
    this.slidesIndexNav(index);
    this.dist.finalPosition = activeSlide.position;
  }

  activePrevSlide() {
    // se "this.index.prev" for diferente de undefined, muda para o index no "this.index.prev"
    if (this.index.prev !== undefined) this.changeSlide(this.index.prev);
  }

  activeNextSlide() {
    // se "this.index.next" for diferente de undefined, muda para o index no "this.index.next"
    if (this.index.next !== undefined) this.changeSlide(this.index.next);
  }

  init() {
    this.bindEvents();
    this.transition(false);
    this.addSlideEvents();
    this.slidesConfig();
    this.changeSlide(0);

    return this;
  }
}
