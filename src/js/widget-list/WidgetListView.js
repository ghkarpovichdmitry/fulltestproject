export default class WidgetListView {
  constructor (controller) {
    this.controller = controller;
  }

  // render (initalData) {
  //   'html'
  //   this.setEvents();
  // }
  //
  // onSelect (selectValue) {
  //   this.controller.onFilterChanged(selectValue);
  // }

  renderWidgetItems (array) {
    const itemsArray = this.controller.getItemsArray(array);
    this.fillDomElementFromArray(itemsArray, this.widgetList);
  }

  fillDomElementFromArray (array, domElement) { // have to be abstract ?
    domElement.innerHTML = array.join('');
  }

  convertDataToListElements (data) {
    // this.
    // return data.map((item, index) => (
    //   `<li class="widget__filter-list__item" data-id='${index + 1}' data-active='${item['active']}' data-disabled='${item['disabled']}' data-item_number='${index + 1}'>
    //     ${item['text']}
    //   </li>`
    // ));
  }

  setSelectors () {
    this.widgetList = document.querySelector('.widget__filter-list');
  }

  setEvents () {
    // this.widgetList.addEventListener('click', (e) => {
    //   this.addLogicToListItems(e);
    // });
  }

  init () {
    this.setSelectors();
    this.setEvents();
  }
}
