import SelectView from './SelectView';
import SelectModel from './SelectModel';
import AbstractController from '../abstract/AbstractController';

class SelectController extends AbstractController {
// export default class SelectController {
  constructor (mainController) {
    super();
    this.mainController = mainController;
    this.view = new SelectView(this);
    this.model = new SelectModel(this);
  }

  init () {
    this.view.init();
  }

  resetSelect () {
    this.view.resetSelect();
  }

  filterWidgetItems () {
    this.mainController.filterWidgetItems();
  }
}

export default SelectController;
