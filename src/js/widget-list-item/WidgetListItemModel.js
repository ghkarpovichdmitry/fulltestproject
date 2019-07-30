export default class WidgetListItemModel {
  constructor (controller) {
    this.controller = controller;
  }

  setSelectors () {
    // this.selectElement = document.querySelector('.widget__filter-select select');
  }

  setEvents () {
  }

  init () {
    this.setSelectors();
    this.setEvents();
  }
}
