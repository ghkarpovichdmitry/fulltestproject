import WidgetListItemView from './WidgetListItemView';
import WidgetListItemModel from './WidgetListItemModel';

export default class WidgetListItemController {
  constructor (mainController) {
    this.mainController = mainController;
    this.view = new WidgetListItemView(this);
    this.model = new WidgetListItemModel(this);
  }

  renderElement (obj, index) { // 10)
    return this.view.renderElement(obj, index);
  }

  init () {
    // this.view.init();
    // this.onCreate();
    // не задействован
  }
}
