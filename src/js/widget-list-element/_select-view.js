class SelectView {
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

  resetSelect () {
    this.selectElement.value = '';
  }

  setSelectors () {
    this.selectElement = document.querySelector('.widget__filter-select-element select-element');
  }

  setEvents () {
  }

  init () {
    this.setSelectors();
    this.setEvents();
  }
}

export default SelectView;
