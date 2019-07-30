import initialData from '../initial-data.js';
import Model from './model.js';
import View from './view.js';
import Controller from './controller.js';

export default class App {
  constructor () {
    this.model = new Model(initialData);
    this.view = new View();
    this.controller = new Controller(this.model, this.view);
  }

  init () {
    this.model.init();
    this.view.init();
    this.controller.init();
  }
}
