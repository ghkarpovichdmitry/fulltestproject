import WidgetListView from './WidgetListView';
import WidgetListModel from './WidgetListModel';
import WidgetListItemController from '../widget-list-item/WidgetListItemController';

export default class WidgetListController {
  constructor (controller) {
    this.mainController = controller;
    this.view = new WidgetListView(this);
    this.model = new WidgetListModel(this);
    this.listItemController = new WidgetListItemController(this);
  }

  renderElement (obj, index) {
    return this.listItemController.renderElement(obj, index);
  }

  getItemsArray (array) {
    return this.model.getItemsArray(array);
  }

  renderWidgetItems (array) {
    this.view.renderWidgetItems(array);
    // const childArray = this.model.getItemsArray(array);
    // const parent = this.view.widgetList;
    // parent.appendChild(childArray); // ???????????
    // this.view.fillDomElementFromArray(childArray, parent);
  }

  init () {
    this.view.init();
  }
}
