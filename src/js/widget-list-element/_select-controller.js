import SelectView from './_select-view';
import SelectModel from './_select-model';

class SelectController {
  constructor (mainController) {
    this.widgetController = mainController;
    this.view = new SelectView(this);
    this.model = new SelectModel(this);
  }

  init () {
    this.view.init();
    // this.onCreate();
    // не задействован
  }

  resetSelect () {
    this.view.resetSelect();
  }

  onCreate () {
    // const initialDate = this.model.initalData;
    // this.view.render(initalData);
  }

  onFilterChanged (newFilterValue) {
    this.widgetController.selectChanged();
  }
}

export default SelectController;
