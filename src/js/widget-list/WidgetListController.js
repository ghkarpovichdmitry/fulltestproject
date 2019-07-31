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

  renderElement (obj, index) { // 9)
    return this.listItemController.renderElement(obj, index);
  }

  getItemsArray (array) { // 6)
    return this.model.getItemsArray(array);
  }

  getInitialDataToModel () {
    let arrayOfObjects = this.mainController.getInitialData();
    this.model.setData(arrayOfObjects);
  }

  renderWidgetItems () { // 4)
    // this.getInitialDataToListController();
    let arrayOfObjects = this.mainController.getInitialData();
    this.view.renderListItems(arrayOfObjects);

    // тут запуск рендера
    // const childArray = this.model.getItemsArray(array);
    // const parent = this.view.widgetList;
    // parent.appendChild(childArray); // ???????????
    // this.view.fillDomElementFromArray(childArray, parent);
  }

  init () {
    this.view.init(); // 2)
    this.model.init();
  }
}
