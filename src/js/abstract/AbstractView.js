export default class AbstractView {
  constructor (controller) {
    this.controller = controller;
  }

  setSelectors () {
  }

  setEvents () {
  }

  init () {
    this.setSelectors();
    this.setEvents();
  }
}
