import Widget from './main-widget/Widget.js';
import data from './initial-data.js';
const widget = new Widget(data);
window.onload = widget.init();

export const config = {
  showLogs: true
};
