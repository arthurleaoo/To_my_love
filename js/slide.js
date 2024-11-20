function debounce(callback, delay) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
      timer = null;
    }, delay);
  };
}

export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = { finalPosition: 0, startX: 0, movement: 0 };

    this.activeClass = "active";
    this.changeEvent = new Event("changeEvent");
  }

  // suavização da transição dos slides da função "changeSlideOnEnd() e ademais":
  transition(active) {
    this.slide.style.transition = active ? "transform 0.7s ease" : "";
  }

  autoplay(delay) {
    this.autoPlayInterval = setInterval(() => {
      this.activeNextSlide();
    }, delay);
    this.transition(true);
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
    this.transition(true);
  }

  onMove(event) {
    const finalPosition = this.updatePosition(event.changedTouches[0].clientX);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    this.wrapper.removeEventListener("touchmove", this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
    this.changeSlideOnEnd();
  }

  changeSlideOnEnd() {
    if (this.dist.movement > 120 && this.index.next !== undefined) this.activeNextSlide();
    else if (this.dist.movement < -120 && this.index.prev !== undefined) this.activePrevSlide();
    else this.changeSlide(this.index.active);
  }

  addSlideEvents() {
    this.wrapper.addEventListener("touchstart", this.onStart, { passive: false });
    this.wrapper.addEventListener("touchend", this.onEnd, { passive: false });
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

    this.changeActiveClass();
    this.wrapper.dispatchEvent(this.changeEvent);
  }

  // Ao index atual (slide atual), adiciona uma classe via CSS. Classe para estilizar.
  changeActiveClass() {
    this.slidesArray.forEach((item) => item.element.classList.remove(this.activeClass));

    this.slidesArray[this.index.active].element.classList.add(this.activeClass);
  }

  activePrevSlide() {
    // se "this.index.prev" for diferente de undefined, muda para o index no "this.index.prev"
    if (this.index.prev !== undefined) this.changeSlide(this.index.prev);
  }

  activeNextSlide() {
    // se "this.index.next" for diferente de undefined, muda para o index no "this.index.next.
    if (this.index.next === undefined) this.changeSlide(0);
    else this.changeSlide(this.index.next); // Quando "this.index.next" for igual a undefined (por conta do autoplay), ele volta para o index 0 e recomeça a contagem.
  }

  onResize() {
    setTimeout(() => {
      this.slidesConfig();
      this.changeSlide(this.index.active);
    }, 900);
  }

  addResizeEvent() {
    window.addEventListener("resize", this.onResize);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);

    // Resize com debounce
    this.onResize = debounce(this.onResize.bind(this), 250);

    // Control Events
    this.eventControl = this.eventControl.bind(this);
    this.activeControlItem = this.activeControlItem.bind(this);
  }

  init() {
    this.bindEvents();
    this.transition(false);
    this.addSlideEvents();
    this.slidesConfig();
    this.changeSlide(0);
    this.addResizeEvent();
    // this.autoplay(2500);
    return this;
  }
}

export class SlideNav extends Slide {
  createControl() {
    const control = document.createElement("ul");
    control.dataset.control = "slide";

    this.slidesArray.forEach((index) => {
      control.innerHTML += `<li><a href="#slide${index + 1}">${index}</a></li>`;
    });
    this.wrapper.appendChild(control);
    return control;
  }

  eventControl(item, index) {
    item.addEventListener(
      "touchstart",
      (event) => {
        event.preventDefault();
        this.changeSlide(index);
      },
      { passive: false }
    );
    this.wrapper.addEventListener("changeEvent", this.activeControlItem);
  }

  activeControlItem() {
    this.controlArray.forEach((item) => item.classList.remove(this.activeClass));
    this.controlArray[this.index.active].classList.add(this.activeClass);
  }

  addControl() {
    this.control = this.createControl();
    this.controlArray = [...this.control.children];
    this.activeControlItem();
    this.controlArray.forEach((item, index) => this.eventControl(item, index));
  }
}
