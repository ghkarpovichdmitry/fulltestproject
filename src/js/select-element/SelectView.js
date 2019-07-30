export default class SelectView {
  constructor (controller) {
    this.controller = controller;
  }

  resetSelect () {
    this.selectElement.value = '';
  }

  setSelectors () {
    this.selectElement = document.querySelector('.widget__filter-select-box select');
  }

  setEvents () {
    this.selectElement.addEventListener('change', () => {
      this.controller.filterWidgetItems();
    });
  }

  init () {
    this.setSelectors();
    this.setEvents();
  }
}
