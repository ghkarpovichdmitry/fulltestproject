export default class WidgetListModel {
  constructor (controller) {
    this.listController = controller;
  }

  getItemsArray (array) {
    let i = 0;
    let len = array.length;
    let arrayLiItems = [];

    for (i; i < len; i++) {
      let it = this.listController.renderElement(array[i], i);
      arrayLiItems.push(it);
    }
    return arrayLiItems;
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
