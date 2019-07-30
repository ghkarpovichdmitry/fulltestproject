import SelectController from '../select-element/SelectController.js';
import SearchController from '../search-element/SearchController.js';
import WidgetModel from './WidgetModel.js';
import WidgetView from './WidgetView.js';

export default class Widget {
  constructor(data) { // is it good to give data?
    this.selectController = new SelectController(this);
    this.searchController = new SearchController(this);
    this.model = new WidgetModel(this, data);
    this.view = new WidgetView(this);
  }

  renderWidgetItems() {
    this.view.renderWidgetItems(this.model.initialDataObjects);
  }

  disableItemsActivationPossibility() {
    this.model.disableItemsActivationPossibility();
  }

  addItemsActivationPossibility(e) {
    this.model.addItemsActivationPossibility(e);
  }

  createActiveItemsCopies() {
    this.view.createActiveItemsCopies(this.model.initialDataObjects);
  }

  refreshNumberOfActiveElements() {
    this.model.refreshNumberOfActiveElements();
  }

  getActivatedItemsArray() {
    return this.model.getActivatedItemsArray(this.model.initialDataObjects);
  }

  addToSavedItems() {
    this.view.addToSavedItems(this.model.initialDataObjects);
  }

  clearSearchAndSelectFields() {
    this.searchController.resetField();
    this.selectController.resetSelect();
  }

  filterWidgetItems () {
    this.model.filterWidgetItems();
  }

  getSearchValue () {
    // console.log(this.searchController.getSearchValue());
  }

  cancelSelection () {
    this.view.containerSelectedItems.innerHTML = '';
    this.model.setInitialData(this.model.initialData);
    this.renderWidgetItems(this.model.initialDataObjects);
    this.clearSearchAndSelectFields();
    this.model.howManyActive = null;
  }

  initForm () {
    this.selectController.init();
    this.searchController.init();
  }

  init () {
    this.view.init();
    this.model.init();
  }
}
