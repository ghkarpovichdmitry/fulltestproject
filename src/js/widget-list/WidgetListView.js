export default class WidgetListView {
  constructor (controller) {
    this.listController = controller;
  }

  // render (initalData) {
  //   'html'
  //   this.setEvents();
  // }
  //
  // onSelect (selectValue) {
  //   this.controller.onFilterChanged(selectValue);
  // }

  renderListItems (array) { // 5)
    const itemsArray = this.listController.getItemsArray(array);
    this.fillDomElementFromArray(itemsArray, this.widgetList); // 11)
  }

  fillDomElementFromArray (array, domElement) { // have to be abstract ?  12)
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
    this.listController.renderWidgetItems(); // 3)
  }
}
