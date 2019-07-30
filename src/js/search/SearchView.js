export default class SearchView {
  constructor (controller) {
    this.controller = controller;
    // this.getSearchValue = this.getSearchValue.bind(this);
  }

  setSelectors () {
    this.searchField = document.querySelector('.widget__filter-search input');
  }

  resetSearchField () {
    this.searchField.value = '';
  }

  getSearchValue () {
    // let self = this;
    // return self.searchField.value;
  }

  setEvents () {
    this.searchField.addEventListener('input', () => {
      this.controller.filterWidgetItems();
      // this.getSearchValue();
    });
  }

  init () {
    this.setSelectors();
    this.setEvents();
  }
}
