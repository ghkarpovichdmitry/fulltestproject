export default class WidgetListModel {
  constructor (controller) {
    this.listController = controller;
    this.data = null;
  }

  setData (obj) {
    this.data = obj;
  }

  getItemsArray (array) { // 7)
    let i = 0;
    let len = array.length;
    let arrayLiItems = [];

    for (i; i < len; i++) {
      let it = this.listController.renderElement(array[i], i); // 8)
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
    this.listController.getInitialDataToModel();
  }
}
