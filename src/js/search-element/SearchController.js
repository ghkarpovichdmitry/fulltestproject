import SearchView from './SearchView';

export default class SearchController {
  constructor (controller) {
    this.mainController = controller;
    this.view = new SearchView(this);
    // this.getSearchValue = this.getSearchValue.bind(this);
  }

  resetField () {
    this.view.resetSearchField();
  }

  filterWidgetItems () {
    this.mainController.filterWidgetItems();
  }

  getSearchValue () {
    this.view.getSearchValue();
  }

  // getValue () {
  //   this.view.value = null;
  // }

  init () {
    this.view.init();
    // не задействован
  }
}
