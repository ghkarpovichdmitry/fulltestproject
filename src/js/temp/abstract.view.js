export class AbstractView {
  constructor (controller) {
    this.controller = controller;
    this.init();
  }

  initEvents () {

  }

  setSelectors () {

  }

  init () {
    this.setSelectors();
    this.initEvents()
  }
}
