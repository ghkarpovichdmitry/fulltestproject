import SelectController from '../select/SelectController.js';
import SearchController from '../search/SearchController.js';
import WidgetListController from '../widget-list/WidgetListController.js';
import WidgetListItemController from '../widget-list-item/WidgetListItemController.js';
import WidgetModel from './WidgetModel.js';
import WidgetView from './WidgetView.js';

export default class Widget {
  constructor (data) { // is it good to give data?
    this.selectController = new SelectController(this);
    this.searchController = new SearchController(this);
    this.listController = new WidgetListController(this);
    this.model = new WidgetModel(this, data);
    this.listItemController = new WidgetListItemController(this);
    this.view = new WidgetView(this);
  }

  renderWidgetList (arr) {
    this.listController.renderWidgetItems(arr);
  }

  getInitialData () {
    return this.model.initialDataObjects;
  }

  // disableItemsActivationPossibility () {
  //   this.model.disableItemsActivationPossibility();
  // }

  // addItemsActivationPossibility (e) {
  //   this.model.addItemsActivationPossibility(e);
  // }

  // createActiveItemsCopies () {
  //   this.view.createActiveItemsCopies(this.model.initialDataObjects);
  // }

  refreshNumberOfActiveElements () {
    this.model.refreshNumberOfActiveElements();
  }

  // getActivatedItemsArray () {
  //   return this.model.getActivatedItemsArray(this.model.initialDataObjects);
  // }

  // addToSavedItems () {
  //   this.view.addToSavedItems(this.model.initialDataObjects);
  // }

  clearSearchAndSelectFields () {
    this.searchController.resetField();
    this.selectController.resetSelect();
  }

  // filterWidgetItems () {
  //   this.model.filterWidgetItems();
  // }

  // getSearchValue () {
  // }

  // cancelSelection () {
  //   this.view.containerSelectedItems.innerHTML = '';
  //   this.model.setInitialData(this.model.initialData);
  //   this.renderWidgetItems(this.model.initialDataObjects);
  //   this.clearSearchAndSelectFields();
  //   this.model.howManyActive = null;
  // }

  initForm () {
    this.selectController.init();
    this.searchController.init();
  }

  init () {
    this.view.init();
    this.model.init();
    this.listController.init(); // 1)
    // this.renderWidgetList(this.model.initialDataObjects);
  }
}
