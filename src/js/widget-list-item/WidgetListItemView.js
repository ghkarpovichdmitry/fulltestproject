import WidgetTemplates from '../widget-templates/WidgetTemplates.js'

export default class WidgetListItemView {
  constructor (controller) {
    this.controller = controller;
    this.listTemplate = new WidgetTemplates();
  }

  renderElement (obj, index) { // 11)
    return this.listTemplate.getListTemplate(obj, index);
  }

  setSelectors () {
  }

  setEvents () {
  }

  init () {
    this.setSelectors();
    this.setEvents();
  }
}
