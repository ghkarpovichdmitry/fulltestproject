export default class AbstractController {
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
